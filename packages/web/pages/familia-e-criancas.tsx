import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "familia-e-criancas";

export const getServerSideProps = mainPageGetServerSideProps(category);

const FamiliaECriancas: NextPage = () => <MainPage category={category} />;

export default FamiliaECriancas;
