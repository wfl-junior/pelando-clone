import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "casa-e-cozinha";

export const getServerSideProps = mainPageGetServerSideProps(category);

const CasaECozinha: NextPage = () => <MainPage category={category} />;

export default CasaECozinha;
