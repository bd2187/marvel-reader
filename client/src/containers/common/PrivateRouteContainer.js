import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRouteContainer = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = rest;
  return (
    <Route
      {...rest}
      render={props => {
        return isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};
export default connect(mapStateToProps)(PrivateRouteContainer);
