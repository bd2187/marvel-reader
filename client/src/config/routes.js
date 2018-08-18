import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import PrivateRouteContainer from "../containers/common/PrivateRouteContainer";
import LandingContainer from "../containers/LandingContainer";
import DashboardContainer from "../containers/DashboardContainer";

const routes = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={LandingContainer} />
      <PrivateRouteContainer path="/dashboard" component={DashboardContainer} />
    </div>
  </BrowserRouter>
);

export default routes;
