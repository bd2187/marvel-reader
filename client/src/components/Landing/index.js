import React, { Component } from "react";
import LogIn from "./LogIn";
import Register from "./Register";

const Landing = props => {
  return (
    <div>
      <LogIn logInUser={props.logInUser} />
      <Register registerUser={props.registerUser} />
    </div>
  );
};

export default Landing;
