import { LOG_IN_USER } from "../constants";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const logInUser = (username, password) => dispatch => {
  axios
    .post("/user/login", { username, password })
    .then(data => {
      var decoded = jwt_decode(data.data.token);
      const { username, email, signUpDate, id } = decoded;
      dispatch({
        type: LOG_IN_USER,
        user: {
          username,
          email,
          signUpDate,
          id
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });
};
