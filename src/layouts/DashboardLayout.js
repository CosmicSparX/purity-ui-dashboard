import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AddIssueModal from "components/AddIssue/AddIssueModal";
import Sidebar from "components/Sidebar";
import React, { useState, useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "theme/theme.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import PropTypes from "prop-types";

export default function DashboardLayout(props) {
  const { layoutPrefix } = props;
  const userRole = "tester"; // This will be dynamic based on logged-in user
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddIssueModalOpen,
    onOpen: onOpenAddIssueModal,
    onClose: onCloseAddIssueModal,
  } = useDisclosure();
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  console.log("DashboardLayout - layoutPrefix:", layoutPrefix);
  // Create a single, definitive list of routes for the current user.
  // This is used for both the router and the sidebar to ensure consistency.
  const userRoutes = useMemo(() => {
    const roleSpecificRoutes = routes.filter(
      (route) => route.layout === layoutPrefix
    );

    const accountPages = routes.find((route) => route.category === "account");
    const sharedRoutes = (accountPages?.views || [])
      .filter((route) => route.path !== "/signin")
      .map((route) => {
        return {
          ...route,
          // Dynamically create the full path for shared routes
          path: route.path,
          // Also update the layout property for consistency in other components
          layout: layoutPrefix,
        };
      });

    // The sidebar needs the ACCOUNT PAGES category wrapper.
    const sidebarAccountCategory = {
      ...accountPages,
      views: sharedRoutes,
    };

    return [...roleSpecificRoutes, sidebarAccountCategory];
  }, [layoutPrefix]);

  const getRoute = () => {
    return window.location.pathname !== `${layoutPrefix}/full-screen-maps`;
  };

  const getActiveRoute = () => {
    // Get the path after the hash, e.g., "/tester" or "/tester/projects"
    const currentPath = window.location.hash.substring(1); // Remove the '#'
    console.log("getActiveRoute - currentPath (from hash):", currentPath);
    // Search role-specific routes
    for (const route of userRoutes) {
      // Construct the full route path including the layout prefix
      const fullRoutePath = route.layout + route.path;
      console.log(
        "getActiveRoute - checking route:",
        fullRoutePath,
        "against currentPath:",
        currentPath
      );
      if (route.path && currentPath.startsWith(fullRoutePath)) {
        console.log("getActiveRoute - matched route:", route.name);
        return route.name;
      }
      // Search shared routes within categories
      if (route.category === "account") {
        for (const view of route.views) {
          // For account pages, the path is relative to the root, so we just check view.path
          if (currentPath.startsWith(view.layout + view.path)) {
            console.log("getActiveRoute - matched account view:", view.name);
            return view.name;
          }
        }
      }
    }
    return "Default Brand Text";
  };

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={userRoutes}
        logoText={null}
        display="none"
        sidebarVariant={sidebarVariant}
        onOpenAddIssueModal={onOpenAddIssueModal}
        userRole={userRole}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={null}
            brandText={getActiveRoute()}
            secondary={false} // This was being calculated in a complex way, simplifying for now
            fixed={fixed}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {layoutPrefix === "/developer" || layoutPrefix === "/tester" ? (
                  <>
                    <Redirect
                      from={layoutPrefix + "/dashboard"}
                      to={layoutPrefix + "/projects"}
                    />
                    <Redirect
                      from={layoutPrefix}
                      to={layoutPrefix + "/projects"}
                      exact
                    />
                  </>
                ) : null}

                {
                  // Render routes for the user's role
                  userRoutes.map((prop, key) => {
                    if (prop.category === "account") {
                      // If it's the account category, map through its views
                      return prop.views.map((view, viewKey) => (
                        <Route
                          path={view.layout + view.path}
                          component={view.component}
                          key={viewKey}
                        />
                      ));
                    } else {
                      // Otherwise, it's a direct route
                      return (
                        <Route
                          path={prop.layout + prop.path}
                          component={prop.component}
                          key={key}
                        />
                      );
                    }
                  })
                }
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Portal>
          <FixedPlugin secondary={false} fixed={fixed} onOpen={onOpen} />
        </Portal>
        <Configurator
          secondary={false}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
      <AddIssueModal
        isOpen={isAddIssueModalOpen}
        onClose={onCloseAddIssueModal}
      />
    </ChakraProvider>
  );
}

DashboardLayout.propTypes = {
  layoutPrefix: PropTypes.string.isRequired,
};
