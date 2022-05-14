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
