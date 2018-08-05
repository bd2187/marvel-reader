import React, { Component } from "react";

import { connect } from "react-redux";
import { logInUser } from "../actions";

import Landing from "../components/Landing";

class LandingContainer extends Component {
  render() {
    return <Landing logInUser={this.props.logInUser} user={this.props.user} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logInUser: (username, password) => {
      dispatch(logInUser(username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingContainer);
