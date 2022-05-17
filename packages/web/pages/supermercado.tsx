import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "supermercado";

export const getServerSideProps = mainPageGetServerSideProps(category);

const Supermercado: NextPage = () => <MainPage category={category} />;

export default Supermercado;
