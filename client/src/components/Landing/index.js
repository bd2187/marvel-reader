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

  render() {
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
            errors={this.props.errors}
          />
        )}
      </div>
    );
  }
}

export default Landing;
