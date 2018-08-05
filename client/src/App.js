import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./store";

import routes from "./config/routes";

class App extends Component {
  render() {
    return <Provider store={store}>{routes}</Provider>;
  }
}

export default App;
