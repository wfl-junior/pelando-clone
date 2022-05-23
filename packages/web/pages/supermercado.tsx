import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("supermercado");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const Supermercado: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default Supermercado;
