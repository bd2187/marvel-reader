import { LOG_IN_USER, LOG_OUT_USER } from "../constants";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthorization from "../utils/setAuthorization";

export const logInUser = (username, password) => dispatch => {
  axios
    .post("/user/login", { username, password })
    .then(res => {
      // Save token in local storage
      const { token } = res.data;
      localStorage.setItem("token", token);

      // Set auth header
      setAuthorization(token);

      // Decode JWT token
      var decoded = jwt_decode(token);

      // const { username, email, signUpDate, id } = decoded;
      dispatch(logUserInfo(decoded));
    })
    .catch(function(err) {
      console.log(err);
    });
};

export const logUserInfo = userData => {
  return {
    type: LOG_IN_USER,
    user: userData
  };
};

export const registerUser = (
  username,
  password,
  confirmPassword,
  email,
  confirmEmail
) => dispatch => {
  axios
    .post("/user/signup", {
      username,
      password,
      confirmPassword,
      email,
      confirmEmail
    })
    .then(res => {
      // redirect user to login page
      console.log("redirect!");
      return;
    })
    .catch(err => {
      // dispatch error
      console.log(`Dispatch Error ${err}`);
    });
};

export const logOutUser = () => {
  localStorage.removeItem("token");
  setAuthorization(null);

  return {
    type: LOG_OUT_USER
  };
};
