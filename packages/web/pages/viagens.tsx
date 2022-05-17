import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "viagens";

export const getServerSideProps = mainPageGetServerSideProps(category);

const Viagens: NextPage = () => <MainPage category={category} />;

export default Viagens;
