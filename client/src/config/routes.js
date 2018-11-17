import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRouteContainer from "../containers/common/PrivateRouteContainer";
import LandingContainer from "../containers/LandingContainer";
import DashboardContainer from "../containers/DashboardContainer";
import ComicsContainer from "../containers/ComicsContainer";
import CharactersContainer from "../containers/CharactersContainer";
import NavBarContainer from "../containers/NavBarContainer";

const routes = (
  <BrowserRouter>
    <div>
      <NavBarContainer />
      <Switch>
        <Route exact path="/" component={LandingContainer} />
        <Route exact path="/comics/" component={ComicsContainer} />
        <Route exact path="/comics/:id" component={ComicsContainer} />
        <Route exact path="/comics/search/:query" component={ComicsContainer} />
        <Route exact path="/characters/" component={CharactersContainer} />
        <Route exact path="/characters/:id" component={CharactersContainer} />
        <PrivateRouteContainer
          path="/dashboard"
          component={DashboardContainer}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default routes;
