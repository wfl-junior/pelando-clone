import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "financas";

export const getServerSideProps = mainPageGetServerSideProps(category);

const Financas: NextPage = () => <MainPage category={category} />;

export default Financas;
