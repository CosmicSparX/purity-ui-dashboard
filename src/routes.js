import Dashboard from "views/Dashboard/Dashboard";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import UserManagement from "views/Dashboard/UserManagement";
import ManagerDashboard from "views/Manager/General";
import Projects from "views/Manager/Projects";
import Issues from "views/Manager/Issues";
import ProjectDetail from "views/Manager/ProjectDetail";
import IssueDetail from "views/Manager/IssueDetail";
import TesterProjects from "views/Tester/Projects";
import TesterIssues from "views/Tester/Issues";
import TesterProjectDetail from "views/Tester/ProjectDetail";
import TesterIssueDetail from "views/Tester/IssueDetail";

import DeveloperProjects from "views/Developer/Projects";
import DeveloperIssues from "views/Developer/Issues";
import DeveloperProjectDetail from "views/Developer/ProjectDetail";
import DeveloperIssueDetail from "views/Developer/IssueDetail";

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
    exact: true,
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
    exact: true,
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
    path: "/projects/:projectId",
    name: "Tester Project Detail",
    component: TesterProjectDetail,
    layout: "/tester",
    invisible: true,
  },
  {
    path: "/issues/:issueId",
    name: "Tester Issue Detail",
    component: TesterIssueDetail,
    layout: "/tester",
    invisible: true,
  },
  {
    path: "/projects",
    name: "Tester Projects",
    icon: <DocumentIcon color="inherit" />,
    component: TesterProjects,
    layout: "/tester",
    exact: true,
  },
  {
    path: "/issues",
    name: "Tester Issues",
    icon: <HelpIcon color="inherit" />,
    component: TesterIssues,
    layout: "/tester",
    exact: true,
  },

  {
    path: "/projects/:projectId",
    name: "Developer Project Detail",
    component: DeveloperProjectDetail,
    layout: "/developer",
    invisible: true,
  },
  {
    path: "/issues/:issueId",
    name: "Developer Issue Detail",
    component: DeveloperIssueDetail,
    layout: "/developer",
    invisible: true,
  },
  {
    path: "/projects",
    name: "Developer Projects",
    icon: <DocumentIcon color="inherit" />,
    component: DeveloperProjects,
    layout: "/developer",
  },
  {
    path: "/issues",
    name: "Developer Issues",
    icon: <HelpIcon color="inherit" />,
    component: DeveloperIssues,
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
