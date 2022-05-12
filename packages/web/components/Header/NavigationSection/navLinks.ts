import { Icon } from "@/@types/app";
import { CarrosIcon } from "@/components/icons/nav/CarrosIcon";
import { CasaIcon } from "@/components/icons/nav/CasaIcon";
import { ComentadasIcon } from "@/components/icons/nav/ComentadasIcon";
import { DeliveryIcon } from "@/components/icons/nav/DeliveryIcon";
import { DestaquesIcon } from "@/components/icons/nav/DestaquesIcon";
import { EletronicosIcon } from "@/components/icons/nav/EletronicosIcon";
import { EsportesIcon } from "@/components/icons/nav/EsportesIcon";
import { FamiliaIcon } from "@/components/icons/nav/FamiliaIcon";
import { FerramentasIcon } from "@/components/icons/nav/FerramentasIcon";
import { FinancasIcon } from "@/components/icons/nav/FinancasIcon";
import { GamesIcon } from "@/components/icons/nav/GamesIcon";
import { GratisIcon } from "@/components/icons/nav/GratisIcon";
import { InternetIcon } from "@/components/icons/nav/InternetIcon";
import { LivrosIcon } from "@/components/icons/nav/LivrosIcon";
import { MaisQuentesIcon } from "@/components/icons/nav/MaisQuentesIcon";
import { MeusAlertasIcon } from "@/components/icons/nav/MeusAlertasIcon";
import { ModaIcon } from "@/components/icons/nav/ModaIcon";
import { RecentesIcon } from "@/components/icons/nav/RecentesIcon";
import { SaudeIcon } from "@/components/icons/nav/SaudeIcon";
import { SupermercadoIcon } from "@/components/icons/nav/SupermercadoIcon";
import { ViagensIcon } from "@/components/icons/nav/ViagensIcon";

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
