import { getVariables, ProductPage } from "@/components/ProductPage";
import {
  getRandomTip,
  tipQuery,
} from "@/components/ProductPage/ExtraSection/CommentsSection/TipSection/tips";
import { addApolloState, initializeApollo } from "@/graphql/client";
import { getSdk } from "@/graphql/sdk";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import { applyFakeMeQuery } from "@/utils/applyFakeMeQuery";
import { refreshAccessTokenServerSide } from "@/utils/refreshAccessTokenServerSide";
import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps<
  {},
  { id: string }
> = async ({ req, res, params }) => {
  const apolloClient = initializeApollo();
  const sdk = getSdk(apolloClient);

  apolloClient.writeQuery({
    query: tipQuery,
    data: getRandomTip(),
  });

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
      props: { accessToken },
    });
  } catch {
    // põe em cache estas queries
    await Promise.allSettled([sdk.query.product({ variables })]);

    // por fake me query em cache, para não precisar dar fetch no client, já que não está autenticado, não tem necessidade
    applyFakeMeQuery(apolloClient);

    return addApolloState(apolloClient);
  }
};

const Product: NextPage = () => <ProductPage />;

export default Product;
