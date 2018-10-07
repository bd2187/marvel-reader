import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllComics } from "../actions";

import Dashboard from "../components/Dashboard";

class DashboardContainer extends Component {
  componentDidMount() {
    this.props.fetchComics();
  }
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

const mapDispatchToProps = dispatch => {
  return {
    fetchComics: function() {
      dispatch(getAllComics());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
