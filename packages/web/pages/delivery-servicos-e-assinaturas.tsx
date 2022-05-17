import { MainPage } from "@/components/MainPage";
import { mainPageGetServerSideProps } from "@/utils/mainPageGetServerSideProps";
import { NextPage } from "next";

const category = "delivery-servicos-e-assinaturas";

export const getServerSideProps = mainPageGetServerSideProps(category);

const DeliveryServicosEAssinaturas: NextPage = () => (
  <MainPage category={category} />
);

export default DeliveryServicosEAssinaturas;
