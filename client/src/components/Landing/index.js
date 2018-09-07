import React, { Component } from "react";
import LogIn from "./LogIn";
import Register from "./Register";

import styles from "./Landing.module.css";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true
    };

    this.toggleLogIn = this.toggleLogIn.bind(this);
  }

  toggleLogIn(loginOrSignUp) {
    console.log(loginOrSignUp);
    console.log(this.state.login);

    if (loginOrSignUp === "login") {
      this.setState(() => {
        return { login: true };
      });
    } else if (loginOrSignUp === "signup") {
      this.setState(() => {
        return { login: false };
      });
    }
  }

  componentDidUpdate() {
    const { signUpSuccess } = this.props.userData;

    if (signUpSuccess) {
      const username = document.getElementById("signUpUsername").value;
      const password = document.getElementById("signUpPassword").value;
      this.props.logInUser(username, password);
    }
  }

  renderErrors(msgArr) {
    return msgArr.map(msg => {
      return (
        <p key={msg} className="error-msg">
          {msg}
        </p>
      );
    });
  }

  render() {
    const { error, msg } = this.props.errors;
    return (
      <div className={styles.wrap}>
        {/* <div className={styles["landing-header-container"]}>
          <button onClick={this.toggleLogIn} className={styles["toggle-btn"]}>
            {this.state.login ? "Sign Up" : "Log In"}
          </button>
        </div> */}

        <div className={styles["landing-content-container"]}>
          <div>
            <button
              onClick={this.toggleLogIn.bind(null, "signup")}
              className={` ${styles["toggle-btn"]}
                ${!this.state.login ? styles["highlighted-button"] : null}`}
            >
              Sign Up
            </button>
            or
            <button
              onClick={this.toggleLogIn.bind(null, "login")}
              className={` ${styles["toggle-btn"]}
              ${this.state.login ? styles["highlighted-button"] : null}`}
            >
              Log In
            </button>
          </div>

          {this.state.login ? (
            <LogIn logInUser={this.props.logInUser} />
          ) : (
            <Register
              logInUser={this.props.logInUser}
              registerUser={this.props.registerUser}
            />
          )}
        </div>

        <div className={styles["error-container"]}>
          {error ? this.renderErrors(msg) : null}
        </div>
      </div>
    );
  }
}

export default Landing;
