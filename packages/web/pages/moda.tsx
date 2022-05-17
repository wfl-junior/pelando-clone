import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "moda";

export const getServerSideProps = mainPageGetServerSideProps(category);

const Moda: NextPage = () => <MainPage category={category} />;

export default Moda;
