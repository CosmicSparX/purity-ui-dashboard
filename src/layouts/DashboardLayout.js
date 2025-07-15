import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar";
import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
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
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const { accessToken, userRole } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/auth/signin");
    } else if (userRole && layoutPrefix !== `/${userRole.toLowerCase()}`) {
      // Redirect to the correct dashboard based on role
      history.push(`/${userRole.toLowerCase()}/dashboard`);
    }
  }, [accessToken, userRole, layoutPrefix, history]);

  if (
    !accessToken ||
    (userRole && layoutPrefix !== `/${userRole.toLowerCase()}`)
  ) {
    return null; // Or a loading spinner, to prevent flickering
  }

  const getRoute = () => {
    return window.location.pathname !== `${layoutPrefix}/full-screen-maps`;
  };

  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === layoutPrefix) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";

  const filteredRoutes = routes.filter(
    (route) => route.layout === layoutPrefix || route.category === "account"
  );

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={filteredRoutes}
        logoText={"PURITY UI DASHBOARD"}
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
            logoText={"PURITY UI DASHBOARD"}
            brandText={getActiveRoute(filteredRoutes)}
            secondary={getActiveNavbar(filteredRoutes)}
            fixed={fixed}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <Redirect
                  from={layoutPrefix}
                  to={`${layoutPrefix}/dashboard`}
                />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}

        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(filteredRoutes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Configurator
          secondary={getActiveNavbar(filteredRoutes)}
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
