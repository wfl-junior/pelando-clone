import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "gratis";

export const getServerSideProps = mainPageGetServerSideProps(category);

const Gratis: NextPage = () => <MainPage category={category} />;

export default Gratis;
