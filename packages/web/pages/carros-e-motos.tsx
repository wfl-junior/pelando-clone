import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "carros-e-motos";

export const getServerSideProps = mainPageGetServerSideProps(category);

const CarrosEMotos: NextPage = () => <MainPage category={category} />;

export default CarrosEMotos;
