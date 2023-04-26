// icon

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { SvgIconComponent } from "@mui/icons-material";
export interface ISideBarConfig {
  id: string;
  title: string;
  path: string;
  icon: SvgIconComponent;
  info?: any;
}
const sideBarConfig: ISideBarConfig[] = [
  {
    id: "dashboard",
    title: "dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    id: "user",
    title: "user",
    path: "/user",
    icon: AccountBoxIcon,
  },
];

export default sideBarConfig;
