import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);

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
    const currentPath = window.location.href;
    // Search role-specific routes
    for (const route of userRoutes) {
      if (route.path && currentPath.indexOf(route.layout + route.path) !== -1) {
        return route.name;
      }
      // Search shared routes within categories
      if (route.category === "account") {
        for (const view of route.views) {
          if (currentPath.indexOf(view.path) !== -1) {
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
                {
                  // Render routes for the user's role
                  userRoutes.map((prop, key) => {
                    if (prop.category === "account") {
                      // If it's the account category, map through its views
                      return prop.views.map((view, viewKey) => (
                        <Route
                          path={layoutPrefix + view.path}
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
                <Redirect
                  exact
                  from={layoutPrefix}
                  to={`${layoutPrefix}/dashboard`}
                />
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
    </ChakraProvider>
  );
}

DashboardLayout.propTypes = {
  layoutPrefix: PropTypes.string.isRequired,
};
