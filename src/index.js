/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import DashboardLayout from "layouts/DashboardLayout.js";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      <Route
        path={`/admin`}
        render={(props) => <DashboardLayout {...props} layoutPrefix="/admin" />}
      />
      <Route
        path={`/manager`}
        render={(props) => (
          <DashboardLayout {...props} layoutPrefix="/manager" />
        )}
      />
      <Route
        path={`/tester`}
        render={(props) => (
          <DashboardLayout {...props} layoutPrefix="/tester" />
        )}
      />
      <Route
        path={`/developer`}
        render={(props) => (
          <DashboardLayout {...props} layoutPrefix="/developer" />
        )}
      />
      <Route
        path={`/default`}
        render={(props) => (
          <DashboardLayout {...props} layoutPrefix="/default" />
        )}
      />
      <Redirect from={`/`} to="/auth/signin" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
