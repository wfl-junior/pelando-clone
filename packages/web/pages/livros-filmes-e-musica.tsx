import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "livros-filmes-e-musica";

export const getServerSideProps = mainPageGetServerSideProps(category);

const LivrosFilmesEMusica: NextPage = () => <MainPage category={category} />;

export default LivrosFilmesEMusica;
