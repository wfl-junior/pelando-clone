import { ProductsQueryVariables } from "@/@types/api";
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

  const queries = [sdk.query.stores()];
  const productVariables = getVariables(id);
  const productsVariables: ProductsQueryVariables = {
    input: {
      perPage: 20,
      orderBy: {
        temperature: "DESC",
      },
    },
  };

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
      sdk.query.product({ variables: productVariables, ...options }),
      sdk.query.me(options),
      sdk.query.products({ variables: productsVariables, ...options }),
      ...queries,
    ]);

    if (
      response.status === "fulfilled" &&
      !response.value.data.product.errors?.some(error => {
        return error.message.toLowerCase().includes("not found");
      })
    ) {
      return addApolloState(apolloClient, {
        props: {
          accessToken,
          // key para poder atualizar quando alterar de página
          key: response.value.data.product.product.id,
        },
      });
    }

    return {
      notFound: true,
    };
  } catch {
    // põe em cache estas queries
    const [response] = await Promise.allSettled([
      sdk.query.product({ variables: productVariables }),
      sdk.query.products({ variables: productsVariables }),
      ...queries,
    ]);

    // por fake me query em cache, para não precisar dar fetch no client, já que não está autenticado, não tem necessidade
    applyFakeMeQuery(apolloClient);

    if (
      response.status === "fulfilled" &&
      !response.value.data.product.errors?.some(error => {
        return error.message.toLowerCase().includes("not found");
      })
    ) {
      return addApolloState(apolloClient, {
        props: {
          // key para poder atualizar quando alterar de página
          key: response.value.data.product.product.id,
        },
      });
    }

    return {
      notFound: true,
    };
  }
};

const Product: NextPage = () => <ProductPage />;

export default Product;
