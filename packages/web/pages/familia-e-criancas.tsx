import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("familia-e-criancas");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const FamiliaECriancas: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default FamiliaECriancas;
