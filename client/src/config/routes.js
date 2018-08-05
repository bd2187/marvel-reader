import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import LandingContainer from "../containers/LandingContainer";

const routes = (
  <BrowserRouter>
    <Route exact path="/" component={LandingContainer} />
  </BrowserRouter>
);

export default routes;
