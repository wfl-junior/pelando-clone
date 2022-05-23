import { MainPage } from "@/components/MainPage";
import { getProductsVariablesForCategory } from "@/utils/getProductsVariablesForCategory";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const variables = getProductsVariablesForCategory(
  "delivery-servicos-e-assinaturas",
);

export const getServerSideProps = mainPageGetServerSideProps(variables);

const DeliveryServicosEAssinaturas: NextPage = () => (
  <MainPage productsQueryVariables={variables} />
);

export default DeliveryServicosEAssinaturas;
