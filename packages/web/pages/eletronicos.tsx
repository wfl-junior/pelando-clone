import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "eletronicos";

export const getServerSideProps = mainPageGetServerSideProps(category);

const Eletronicos: NextPage = () => <MainPage category={category} />;

export default Eletronicos;
