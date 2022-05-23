import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("casa-e-cozinha");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const CasaECozinha: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default CasaECozinha;
