import {
  LOG_IN_USER,
  LOG_OUT_USER,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP
} from "../constants";
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

export const registerUser = userData => dispatch => {
  axios
    .post("/user/signup", {
      username: userData.username,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      email: userData.email,
      confirmEmail: userData.confirmEmail
    })
    .then(res => {
      const { error, msg, success, username } = res.data;

      if (error) {
        return dispatch({
          type: USER_SIGN_UP_ERROR,
          msg: msg
        });
      }

      if (success) {
        return dispatch({
          type: USER_SIGN_UP,
          username
        });
      }
    })
    .catch(err => {
      return dispatch({
        type: USER_SIGN_UP_ERROR,
        msg: "There was an error with our signup process. Please try again"
      });
    });
};

export const logOutUser = () => {
  localStorage.removeItem("token");
  setAuthorization(null);

  return {
    type: LOG_OUT_USER
  };
};
