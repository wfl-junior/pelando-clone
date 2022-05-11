import { Icon } from "@/@types/app";
import { CarrosIcon } from "../icons/nav/CarrosIcon";
import { CasaIcon } from "../icons/nav/CasaIcon";
import { ComentadasIcon } from "../icons/nav/ComentadasIcon";
import { DeliveryIcon } from "../icons/nav/DeliveryIcon";
import { DestaquesIcon } from "../icons/nav/DestaquesIcon";
import { EletronicosIcon } from "../icons/nav/EletronicosIcon";
import { EsportesIcon } from "../icons/nav/EsportesIcon";
import { FamiliaIcon } from "../icons/nav/FamiliaIcon";
import { FerramentasIcon } from "../icons/nav/FerramentasIcon";
import { FinancasIcon } from "../icons/nav/FinancasIcon";
import { GamesIcon } from "../icons/nav/GamesIcon";
import { GratisIcon } from "../icons/nav/GratisIcon";
import { InternetIcon } from "../icons/nav/InternetIcon";
import { LivrosIcon } from "../icons/nav/LivrosIcon";
import { MaisQuentesIcon } from "../icons/nav/MaisQuentesIcon";
import { MeusAlertasIcon } from "../icons/nav/MeusAlertasIcon";
import { ModaIcon } from "../icons/nav/ModaIcon";
import { RecentesIcon } from "../icons/nav/RecentesIcon";
import { SaudeIcon } from "../icons/nav/SaudeIcon";
import { SupermercadoIcon } from "../icons/nav/SupermercadoIcon";
import { ViagensIcon } from "../icons/nav/ViagensIcon";

interface NavLink {
  label: string;
  route: string;
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
    route: "#",
    Icon: DestaquesIcon,
  },
  {
    label: "Recentes",
    route: "#",
    Icon: RecentesIcon,
  },
  {
    label: "Mais Quentes",
    route: "#",
    Icon: MaisQuentesIcon,
  },
  {
    label: "Comentadas",
    route: "#",
    Icon: ComentadasIcon,
  },
  {
    label: "Eletrônicos",
    route: "#",
    Icon: EletronicosIcon,
  },
  {
    label: "Games e PC Gamer",
    route: "#",
    Icon: GamesIcon,
  },
  {
    label: "Casa e Cozinha",
    route: "#",
    Icon: CasaIcon,
  },
  {
    label: "Moda",
    route: "#",
    Icon: ModaIcon,
  },
  {
    label: "Livros, Filmes e Música",
    route: "#",
    Icon: LivrosIcon,
  },
  {
    label: "Saúde e Beleza",
    route: "#",
    Icon: SaudeIcon,
  },
  {
    label: "Supermercado",
    route: "#",
    Icon: SupermercadoIcon,
  },
  {
    label: "Esportes e Exercícios",
    route: "#",
    Icon: EsportesIcon,
  },
  {
    label: "Grátis",
    route: "#",
    Icon: GratisIcon,
  },
  {
    label: "Finanças",
    route: "#",
    Icon: FinancasIcon,
  },
  {
    label: "Família e Crianças",
    route: "#",
    Icon: FamiliaIcon,
  },
  {
    label: "Delivery, Serviços e Assinaturas",
    route: "#",
    Icon: DeliveryIcon,
  },
  {
    label: "Viagens",
    route: "#",
    Icon: ViagensIcon,
  },
  {
    label: "Carros e Motos",
    route: "#",
    Icon: CarrosIcon,
  },
  {
    label: "Ferramentas e Jardim",
    route: "#",
    Icon: FerramentasIcon,
  },
  {
    label: "Planos de Internet, TV, Celular e Fixo",
    route: "#",
    Icon: InternetIcon,
  },
];
