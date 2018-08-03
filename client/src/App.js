import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import { logInUser } from "./actions";

// Sample dispatch to be removed
store.dispatch(logInUser("danaerys212", "password"));

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
