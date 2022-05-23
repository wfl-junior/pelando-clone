import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("games-e-pc-gamer");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const GamesEPcGamer: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default GamesEPcGamer;
