import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("ferramentas-e-jardim");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const FerramentasEJardim: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default FerramentasEJardim;
