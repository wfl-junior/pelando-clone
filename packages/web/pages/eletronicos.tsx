import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("eletronicos");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const Eletronicos: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default Eletronicos;
