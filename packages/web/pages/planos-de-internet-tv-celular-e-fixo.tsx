import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory(
  "planos-de-internet-tv-celular-e-fixo",
);

export const getServerSideProps = mainPageGetServerSideProps(variables);

const PlanosDeInternetTvCelularEFixo: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default PlanosDeInternetTvCelularEFixo;
