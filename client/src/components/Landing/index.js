import React, { Component } from "react";
import LogIn from "./LogIn";
import Register from "./Register";

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
      <div>
        <button onClick={this.toggleLogIn}>
          {this.state.login ? "Sign Up" : "Log In"}
        </button>
        {this.state.login ? (
          <LogIn logInUser={this.props.logInUser} />
        ) : (
          <Register
            logInUser={this.props.logInUser}
            registerUser={this.props.registerUser}
          />
        )}

        {error ? this.renderErrors(msg) : null}
      </div>
    );
  }
}

export default Landing;
