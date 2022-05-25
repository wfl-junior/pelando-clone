import { ProductsQueryInput } from "@/@types/api";
import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import type { NextPage } from "next";

const variables: ProductsQueryInput = {
  orderBy: {
    createdAt: "DESC",
  },
};

export const getServerSideProps = mainPageGetServerSideProps(variables);

const Recentes: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default Recentes;
