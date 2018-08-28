import React, { Component } from "react";
import styles from "./Landing.module.css";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const inputField = e.target.getAttribute("data-input");
    const value = e.target.value;
    this.setState({
      [inputField]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username } = this.state;
    const { password } = this.state;
    const { logInUser } = this.props;

    logInUser(username, password);
  }

  render() {
    return (
      <div>
        <div className={styles["title-container"]}>
          <h1 className={styles.title}>Log in</h1>
        </div>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Username"
            data-input="username"
            value={this.state.username}
            onChange={this.onChange}
          />

          <input
            type="password"
            placeholder="Password"
            data-input="password"
            value={this.state.password}
            onChange={this.onChange}
          />

          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

export default LogIn;
