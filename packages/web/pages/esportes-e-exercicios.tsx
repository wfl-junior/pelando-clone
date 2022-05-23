import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("esportes-e-exercicios");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const EsportesEExercicios: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default EsportesEExercicios;
