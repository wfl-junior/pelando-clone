import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("carros-e-motos");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const CarrosEMotos: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default CarrosEMotos;
