import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory("moda");

export const getServerSideProps = mainPageGetServerSideProps(variables);

const Moda: NextPage = () => <MainPage productsQueryVariables={variables} />;

export default Moda;
