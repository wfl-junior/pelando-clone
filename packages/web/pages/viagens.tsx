import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("viagens");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const Viagens: NextPage = () => <MainPage productsQueryVariables={variables} />;

export default Viagens;
