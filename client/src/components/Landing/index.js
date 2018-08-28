import React, { Component } from "react";
import { Link } from "react-router-dom";
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

  toggleLogIn() {
    this.setState(prevState => {
      return { login: !prevState.login };
    });
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
        <div className={styles["landing-header-container"]}>
          <Link to="/">Home</Link>
          <button onClick={this.toggleLogIn} className={styles["toggle-btn"]}>
            {this.state.login ? "Sign Up" : "Log In"}
          </button>
        </div>

        <div className={styles["landing-content-container"]}>
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
