import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("livros-filmes-e-musica");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const LivrosFilmesEMusica: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default LivrosFilmesEMusica;
