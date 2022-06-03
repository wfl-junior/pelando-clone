import { gql, useQuery } from "@apollo/client";

interface Tip {
  heading: string;
  body: string;
}

const tips: Tip[] = [
  {
    heading:
      "🚨 Seja avisado quando o produto que você procura aparecer por aqui.",
    body: "É só cadastrar um alerta de desejos para receber uma notificação.",
  },
  {
    heading: "💸 O preço exibido nessa promoção mudou?",
    body: "Reporte a promoção para o Time de Comunidade, clicando nos três pontinhos ao lado do título.",
  },
  {
    heading: "🤑 Viu este produto por um preço menor nos últimos dias?",
    body: "Reporte a promoção para nosso Time de Comunidade, clicando nos três pontinhos ao lado do título. Nós a encerraremos se o preço estiver mais alto que o praticado nos últimos 7 dias.",
  },
  {
    heading: "📧 Precisa falar com o Time Pelando?",
    body: "Entre em contato conosco através da nossa Central de Ajuda. Estamos sempre prontos para conversar com você! 🧡",
  },
  {
    heading: "❌ Sem concorrentes",
    body: "Não permitimos divulgar concorrentes aqui, lembre-se que somos uma empresa e precisamos manter o Pelando funcionando a todo vapor! 🔥",
  },
  {
    heading: "🙏 🗣 Nós evitamos falar de política e religião por aqui.",
    body: "Sabemos que, às vezes, até entre família e amigos é complicado falar sobre estes assuntos, imaginem só no Pelando! 🤣",
  },
  {
    heading: "🏴‍☠️ Não apoiamos a pirataria.",
    body: "Menções a VPN, IPTV, formas de burlar sistemas, pirataria e similares podem ser deletadas do Pelando. Vamos deixar a comunidade mais leve?",
  },
];

export function getRandomTip() {
  return tips[Math.floor(Math.random() * tips.length)];
}

export const tipQuery = gql`
  query Tip @client {
    heading
    body
  }
`;

export function useTip() {
  const { data } = useQuery<Tip>(tipQuery);
  return data!;
}
