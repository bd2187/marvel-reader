import React, { Component } from "react";
import jwt_decode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./store";
import { logUserInfo, logOutUser } from "./actions";

import routes from "./config/routes";

// Get token from local storage
const token = localStorage.getItem("token");

if (token) {
  // If the token exists, decoded it
  const decoded = jwt_decode(token);

  // Get current time
  const currentTime = Date.now() / 1000;
  const tokenExp = decoded.exp;

  /*
    If the token expired, log the user out by dispatching the logOutUser action.
    Otherwise, log the user in by dispatching logUserInfo(decoded)
  */
  tokenExp < currentTime
    ? store.dispatch(logOutUser())
    : store.dispatch(logUserInfo(decoded));
}

class App extends Component {
  render() {
    return <Provider store={store}>{routes}</Provider>;
  }
}

export default App;
