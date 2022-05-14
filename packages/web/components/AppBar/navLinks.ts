import { Icon, ILink } from "@/@types/app";
import { AlertasIcon } from "../icons/appbar/AlertasIcon";
import { InicioIcon } from "../icons/appbar/InicioIcon";
import { PostarIcon } from "../icons/appbar/PostarIcon";
import { HamburguerIcon } from "../icons/HamburguerIcon";

interface NavLink extends ILink {
  Icon: Icon;
}

export const navLinks: NavLink[] = [
  {
    label: "Início",
    route: "#",
    Icon: InicioIcon,
  },
  {
    label: "Postar",
    route: "#",
    Icon: PostarIcon,
  },
  {
    label: "Alertas",
    route: "#",
    Icon: AlertasIcon,
  },
  {
    label: "Mais",
    route: "#",
    Icon: HamburguerIcon,
  },
];
