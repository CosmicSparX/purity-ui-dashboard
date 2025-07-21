import Dashboard from "views/Dashboard/Dashboard";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import UserManagement from "views/Dashboard/UserManagement";
import ManagerDashboard from "views/Manager/General";
import Projects from "views/Manager/Projects";
import Issues from "views/Manager/Issues";
import ProjectDetail from "views/Manager/ProjectDetail";
import IssueDetail from "views/Manager/IssueDetail";
import TesterDashboard from "views/Dashboard/TesterDashboard";
import DeveloperDashboard from "views/Dashboard/DeveloperDashboard";

import {
  HomeIcon,
  PersonIcon,
  DocumentIcon,
  HelpIcon,
} from "components/Icons/Icons";

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
    component: ManagerDashboard,
    layout: "/manager",
  },
  {
    path: "/projects/:projectId",
    name: "Project Detail",
    component: ProjectDetail,
    layout: "/manager",
    invisible: true,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <DocumentIcon color="inherit" />,
    component: Projects,
    layout: "/manager",
    exact: true,
  },
  {
    path: "/issues/:issueId",
    name: "Issue Detail",
    component: IssueDetail,
    layout: "/manager",
    invisible: true,
  },
  {
    path: "/issues",
    name: "Issues",
    icon: <HelpIcon color="inherit" />,
    component: Issues,
    layout: "/manager",
    exact: true,
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
