import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "saude-e-beleza";

export const getServerSideProps = mainPageGetServerSideProps(category);

const SaudeEBeleza: NextPage = () => <MainPage category={category} />;

export default SaudeEBeleza;
