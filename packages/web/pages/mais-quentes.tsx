import { ProductsQueryInput } from "@/@types/api";
import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import type { NextPage } from "next";

const variables: ProductsQueryInput = {
  orderBy: {
    temperature: "DESC",
  },
};

export const getServerSideProps = mainPageGetServerSideProps(variables);

const MaisQuentes: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default MaisQuentes;
