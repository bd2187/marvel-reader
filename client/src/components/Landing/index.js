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

  render() {
    return (
      <div>
        <button onClick={this.toggleLogIn}>
          {this.state.login ? "Sign Up" : "Log In"}
        </button>
        {this.state.login ? (
          <LogIn
            logInUser={this.props.logInUser}
            userData={this.props.userData}
          />
        ) : (
          <Register
            registerUser={this.props.registerUser}
            errors={this.props.errors}
          />
        )}
      </div>
    );
  }
}

export default Landing;
