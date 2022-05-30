import { ProductQueryVariables } from "@/@types/api";
import { defaultErrorMessage } from "@/constants";
import { addApolloState, initializeApollo } from "@/graphql/client";
import { getSdk } from "@/graphql/sdk";
import { useProductQuery } from "@/hooks/apollo/queries/useProductQuery";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import { applyFakeMeQuery } from "@/utils/applyFakeMeQuery";
import { refreshAccessTokenServerSide } from "@/utils/refreshAccessTokenServerSide";
import { GetServerSideProps } from "next";

interface ProductPageProps {
  id: string;
}

function getVariables(id: string): ProductQueryVariables {
  return {
    input: {
      where: { id },
    },
  };
}

export const getServerSideProps: GetServerSideProps<
  ProductPageProps,
  { id: string }
> = async ({ req, res, params }) => {
  const apolloClient = initializeApollo();
  const sdk = getSdk(apolloClient);

  const { id } = params!;

  const variables = getVariables(id);

  try {
    const accessToken = await refreshAccessTokenServerSide(req, res);

    const options = {
      context: {
        headers: {
          authorization: authorizationHeaderWithToken(accessToken),
        },
      },
    };

    // põe em cache estas queries
    const [response] = await Promise.allSettled([
      sdk.query.product({ variables, ...options }),
      sdk.query.me(options),
    ]);

    if (
      response.status === "fulfilled" &&
      response.value.data.product.errors?.some(error => {
        return error.message.toLowerCase().includes("not found");
      })
    ) {
      return {
        notFound: true,
      };
    }

    return addApolloState(apolloClient, {
      props: { accessToken, id },
    });
  } catch {
    // põe em cache estas queries
    await Promise.allSettled([sdk.query.product({ variables })]);

    // por fake me query em cache, para não precisar dar fetch no client, já que não está autenticado, não tem necessidade
    applyFakeMeQuery(apolloClient);

    return addApolloState(apolloClient, {
      props: { id },
    });
  }
};

const Product: React.FC<ProductPageProps> = ({ id }) => {
  const { data, error } = useProductQuery({ variables: getVariables(id) });

  return (
    <div className="flex flex-col gap-4">
      <section className="bg-default-background pb-4 pt-8">
        <div className="container">
          {!data || error ? (
            <div className="flex items-center justify-center">
              <p className="text-center font-bold lg:text-xl">
                {defaultErrorMessage}
              </p>
            </div>
          ) : (
            <h1 className="text-xl font-bold md:text-2xl">
              {data.product.product.title}
            </h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default Product;
