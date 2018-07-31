import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>test</h1>
      </Provider>
    );
  }
}

export default App;
