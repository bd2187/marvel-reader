import React, { Component } from "react";
import { Redirect } from "react-router";

import { connect } from "react-redux";
import { logInUser, registerUser } from "../actions";

import Landing from "../components/Landing";

class LandingContainer extends Component {
  render() {
    return this.props.isLoggedIn ? (
      <Redirect to="/dashboard" />
    ) : (
      <Landing
        logInUser={this.props.logInUser}
        errors={this.props.errors}
        registerUser={this.props.registerUser}
        userData={this.props.userData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    errors: state.user.errors,
    userData: state.user.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logInUser: (username, password) => {
      dispatch(logInUser(username, password));
    },

    registerUser: userData => {
      dispatch(registerUser(userData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingContainer);
