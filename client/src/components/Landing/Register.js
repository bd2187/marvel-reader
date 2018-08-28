import React, { Component } from "react";
import TextInput from "../common/TextInput";
import styles from "./Landing.module.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    var userData = [...document.querySelectorAll(".registration-input")].reduce(
      (acc, input) => {
        acc[input.getAttribute("data-input")] = input.value;

        return acc;
      },
      {}
    );

    // console.log(this.props.registerUser);
    this.props.registerUser(userData);
  }

  render() {
    return (
      <div>
        <div className={styles["title-container"]}>
          <h1 className={styles.title}>Sign Up</h1>
        </div>
        <form onSubmit={this.onSubmit} id="registrationForm">
          <TextInput
            type="text"
            placeholder="Username"
            dataInput="username"
            className="registration-input"
            id="signUpUsername"
          />

          <TextInput
            type="password"
            placeholder="Password"
            dataInput="password"
            className="registration-input"
            id="signUpPassword"
          />

          <TextInput
            type="password"
            placeholder="Confirm Password"
            dataInput="confirmPassword"
            className="registration-input"
          />

          <TextInput
            type="email"
            placeholder="Email"
            dataInput="email"
            className="registration-input"
          />

          <TextInput
            type="email"
            placeholder="Confirm Email"
            dataInput="confirmEmail"
            className="registration-input"
          />

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default Register;
