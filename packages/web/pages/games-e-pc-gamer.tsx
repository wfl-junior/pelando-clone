import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "games-e-pc-gamer";

export const getServerSideProps = mainPageGetServerSideProps(category);

const GamesEPcGamer: NextPage = () => <MainPage category={category} />;

export default GamesEPcGamer;
