import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRouteContainer from "../containers/common/PrivateRouteContainer";
import LandingContainer from "../containers/LandingContainer";
import DashboardContainer from "../containers/DashboardContainer";
import ComicsContainer from "../containers/ComicsContainer";

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingContainer} />
      <Route exact path="/comics" component={ComicsContainer} />
      <PrivateRouteContainer path="/dashboard" component={DashboardContainer} />
    </Switch>
  </BrowserRouter>
);

export default routes;
