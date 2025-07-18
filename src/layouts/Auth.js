// chakra imports
import { Box, ChakraProvider } from "@chakra-ui/react";

// core components

import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import routes from "routes.js";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "theme/theme.js";

export default function Pages() {
  const { accessToken, userRole } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (accessToken && userRole) {
      history.push(`/${userRole.toLowerCase()}/dashboard`);
    }
    document.body.style.overflow = "unset";
  }, [accessToken, userRole, history]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
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
  const navRef = React.useRef();
  document.documentElement.dir = "ltr";
  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box ref={navRef} w="100%">
        <Box w="100%">
          <Box w="100%">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/auth" to="/auth/login-page" />
            </Switch>
          </Box>
        </Box>
        <Box px="24px" mx="auto" width="1044px" maxW="100%"></Box>
      </Box>
    </ChakraProvider>
  );
}
