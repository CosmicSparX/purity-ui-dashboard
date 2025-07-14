import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import ManagerDashboard from "views/Dashboard/ManagerDashboard";
import TesterDashboard from "views/Dashboard/TesterDashboard";
import DeveloperDashboard from "views/Dashboard/DeveloperDashboard";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/rtl-support-page",
    name: "RTL",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    component: RTLPage,
    layout: "/rtl",
  },
  {
    path: "/dashboard",
    name: "Manager Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: ManagerDashboard,
    layout: "/manager",
  },
  {
    path: "/dashboard",
    name: "Tester Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: TesterDashboard,
    layout: "/tester",
  },
  {
    path: "/dashboard",
    name: "Developer Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: DeveloperDashboard,
    layout: "/developer",
  },
  {
    path: "/dashboard",
    name: "Default Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard, // You can create a generic default dashboard component if needed
    layout: "/default",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
