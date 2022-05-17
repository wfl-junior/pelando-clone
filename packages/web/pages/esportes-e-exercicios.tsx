import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "esportes-e-exercicios";

export const getServerSideProps = mainPageGetServerSideProps(category);

const EsportesEExercicios: NextPage = () => <MainPage category={category} />;

export default EsportesEExercicios;
