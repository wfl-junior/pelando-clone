import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "ferramentas-e-jardim";

export const getServerSideProps = mainPageGetServerSideProps(category);

const FerramentasEJardim: NextPage = () => <MainPage category={category} />;

export default FerramentasEJardim;
