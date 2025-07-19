import Dashboard from "views/Dashboard/Dashboard";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import UserManagement from "views/Dashboard/UserManagement";
import ManagerDashboardPage from "views/Dashboard/ManagerDashboard/ManagerDashboardPage";
import TesterDashboard from "views/Dashboard/TesterDashboard";
import DeveloperDashboard from "views/Dashboard/DeveloperDashboard";

import { HomeIcon, PersonIcon, DocumentIcon } from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: <PersonIcon color="inherit" />,
    component: UserManagement,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Manager Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: ManagerDashboardPage,
    layout: "/manager",
  },
  {
    path: "/dashboard",
    name: "Tester Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: TesterDashboard,
    layout: "/tester",
  },
  {
    path: "/dashboard",
    name: "Developer Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: DeveloperDashboard,
    layout: "/developer",
  },
  {
    path: "/dashboard",
    name: "Default Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard, // You can create a generic default dashboard component if needed
    layout: "/default",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
