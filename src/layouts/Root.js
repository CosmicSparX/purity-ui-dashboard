import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthLayout from "./Auth";
import DashboardLayout from "./DashboardLayout";
import { Flex, Spinner, Portal } from "@chakra-ui/react"; // Import Flex, Spinner, Portal

export default function Root() {
  const { userRole, verifyAndRefreshTokens, loading: authLoading } = useAuth(); // Use authLoading to avoid name collision

  useEffect(() => {
    const checkAuth = async () => {
      await verifyAndRefreshTokens();
    };
    checkAuth();
  }, []);

  const getLayoutForRole = (role) => {
    switch (role.toLowerCase()) {
      case "manager":
        return "/manager";
      case "developer":
        return "/developer";
      case "tester":
        return "/tester";
      case "admin":
        return "/admin";
      default:
        return "/default";
    }
  };

  // If user is not logged in, only allow access to auth routes
  if (!userRole) {
    return (
      <>
        {authLoading && (
          <Portal>
            <Flex
              position="fixed"
              top="0"
              left="0"
              width="100vw"
              height="100vh"
              bg="rgba(0, 0, 0, 0.5)"
              justifyContent="center"
              alignItems="center"
              zIndex="9999"
            >
              <Spinner boxSize="150px" color="white" />
            </Flex>
          </Portal>
        )}
        <Switch>
          <Route path="/auth" component={AuthLayout} />
          <Redirect to="/auth/signin" />
        </Switch>
      </>
    );
  }

  console.log(userRole);
  // If user is logged in, set up the main layout and redirects
  const userLayoutPath = getLayoutForRole(userRole);
  console.log("Root.js - userLayoutPath:", userLayoutPath);

  return (
    <>
      {authLoading && (
        <Portal>
          <Flex
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            bg="rgba(0, 0, 0, 0.5)"
            justifyContent="center"
            alignItems="center"
            zIndex="9999"
          >
            <Spinner boxSize="150px" color="white" />
          </Flex>
        </Portal>
      )}
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route
          path={userLayoutPath}
          component={(props) => (
            <DashboardLayout {...props} layoutPrefix={userLayoutPath} />
          )}
        />
        <Redirect from="/" to={`${userLayoutPath}/projects`} />
      </Switch>
    </>
  );
}
