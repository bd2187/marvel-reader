import React from "react";
import { connect } from "react-redux";
import { logOutUser } from "../actions";
import NavBar from "../components/Navbar";

const NavBarContainer = props => {
  return <NavBar logOut={props.logOut} user={props.user} />;
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      return dispatch(logOutUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer);
