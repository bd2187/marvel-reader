import React, { Component } from "react";

import { connect } from "react-redux";

import Dashboard from "../components/Dashboard";

class DashboardContainer extends Component {
  render() {
    const { user, profile } = this.props;
    return <Dashboard user={user} profile={profile} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile
  };
};

export default connect(mapStateToProps)(DashboardContainer);
