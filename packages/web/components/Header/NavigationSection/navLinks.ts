import { Icon, ILink } from "@/@types/app";
import { CarrosIcon } from "@/components/icons/header/nav/CarrosIcon";
import { CasaIcon } from "@/components/icons/header/nav/CasaIcon";
import { ComentadasIcon } from "@/components/icons/header/nav/ComentadasIcon";
import { DeliveryIcon } from "@/components/icons/header/nav/DeliveryIcon";
import { DestaquesIcon } from "@/components/icons/header/nav/DestaquesIcon";
import { EletronicosIcon } from "@/components/icons/header/nav/EletronicosIcon";
import { EsportesIcon } from "@/components/icons/header/nav/EsportesIcon";
import { FamiliaIcon } from "@/components/icons/header/nav/FamiliaIcon";
import { FerramentasIcon } from "@/components/icons/header/nav/FerramentasIcon";
import { FinancasIcon } from "@/components/icons/header/nav/FinancasIcon";
import { GamesIcon } from "@/components/icons/header/nav/GamesIcon";
import { GratisIcon } from "@/components/icons/header/nav/GratisIcon";
import { InternetIcon } from "@/components/icons/header/nav/InternetIcon";
import { LivrosIcon } from "@/components/icons/header/nav/LivrosIcon";
import { MaisQuentesIcon } from "@/components/icons/header/nav/MaisQuentesIcon";
import { MeusAlertasIcon } from "@/components/icons/header/nav/MeusAlertasIcon";
import { ModaIcon } from "@/components/icons/header/nav/ModaIcon";
import { RecentesIcon } from "@/components/icons/header/nav/RecentesIcon";
import { SaudeIcon } from "@/components/icons/header/nav/SaudeIcon";
import { SupermercadoIcon } from "@/components/icons/header/nav/SupermercadoIcon";
import { ViagensIcon } from "@/components/icons/header/nav/ViagensIcon";

interface NavLink extends ILink {
  Icon: Icon;
}

export const navLinks: NavLink[] = [
  {
    label: "Meus Alertas",
    route: "#",
    Icon: MeusAlertasIcon,
  },
  {
    label: "Destaques",
    route: "/",
    Icon: DestaquesIcon,
  },
  {
    label: "Recentes",
    route: "/recentes",
    Icon: RecentesIcon,
  },
  {
    label: "Mais Quentes",
    route: "/mais-quentes",
    Icon: MaisQuentesIcon,
  },
  {
    label: "Comentadas",
    route: "/comentadas",
    Icon: ComentadasIcon,
  },
  {
    label: "Eletrônicos",
    route: "/eletronicos",
    Icon: EletronicosIcon,
  },
  {
    label: "Games e PC Gamer",
    route: "/games-e-pc-gamer",
    Icon: GamesIcon,
  },
  {
    label: "Casa e Cozinha",
    route: "/casa-e-cozinha",
    Icon: CasaIcon,
  },
  {
    label: "Moda",
    route: "/moda",
    Icon: ModaIcon,
  },
  {
    label: "Livros, Filmes e Música",
    route: "/livros-files-e-musica",
    Icon: LivrosIcon,
  },
  {
    label: "Saúde e Beleza",
    route: "/saude-e-beleza",
    Icon: SaudeIcon,
  },
  {
    label: "Supermercado",
    route: "/supermercado",
    Icon: SupermercadoIcon,
  },
  {
    label: "Esportes e Exercícios",
    route: "/esportes-e-exercicios",
    Icon: EsportesIcon,
  },
  {
    label: "Grátis",
    route: "/gratis",
    Icon: GratisIcon,
  },
  {
    label: "Finanças",
    route: "/financas",
    Icon: FinancasIcon,
  },
  {
    label: "Família e Crianças",
    route: "/familia-e-criancas",
    Icon: FamiliaIcon,
  },
  {
    label: "Delivery, Serviços e Assinaturas",
    route: "/delivery-servicos-e-assinaturas",
    Icon: DeliveryIcon,
  },
  {
    label: "Viagens",
    route: "/viagens",
    Icon: ViagensIcon,
  },
  {
    label: "Carros e Motos",
    route: "/carros-e-motos",
    Icon: CarrosIcon,
  },
  {
    label: "Ferramentas e Jardim",
    route: "/ferramentas-e-jardim",
    Icon: FerramentasIcon,
  },
  {
    label: "Planos de Internet, TV, Celular e Fixo",
    route: "/planos-de-internet-tv-celular-e-fixo",
    Icon: InternetIcon,
  },
];
