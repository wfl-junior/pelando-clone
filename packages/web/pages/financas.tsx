import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("financas");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const Financas: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default Financas;
