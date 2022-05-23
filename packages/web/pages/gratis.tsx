import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("gratis");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const Gratis: NextPage = () => <MainPage productsQueryVariables={variables} />;

export default Gratis;
