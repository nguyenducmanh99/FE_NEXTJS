// icon

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BugReportIcon from "@mui/icons-material/BugReport";
import { SvgIconComponent } from "@mui/icons-material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { PAGE } from "@/constant";
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
    path: PAGE.DASHBOARD,
    icon: DashboardIcon,
  },
  {
    id: "user",
    title: "users",
    path: PAGE.USERS,
    icon: AccountBoxIcon,
  },
  {
    id: "404",
    title: "Error",
    path: PAGE.ERROR,
    icon: BugReportIcon,
  },
  {
    id: "product",
    title: "product",
    path: PAGE.PRODUCT,
    icon: RocketLaunchIcon,
  },
];

export default sideBarConfig;
