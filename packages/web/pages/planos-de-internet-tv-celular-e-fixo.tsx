import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "planos-de-internet-tv-celular-e-fixo";

export const getServerSideProps = mainPageGetServerSideProps(category);

const PlanosDeInternetTvCelularEFixo: NextPage = () => (
  <MainPage category={category} />
);

export default PlanosDeInternetTvCelularEFixo;
