import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import type { NextPage } from "next";

export const getServerSideProps = mainPageGetServerSideProps();

const Home: NextPage = () => <MainPage highlight />;

export default Home;
