import {
  LOG_IN_USER,
  LOG_OUT_USER,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP,
  USER_LOG_IN_ERROR,
  ADD_FAVORITE_CHARACTER,
  USER_LOADING
} from "../constants";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthorization from "../utils/setAuthorization";

export const logInUser = (username, password) => dispatch => {
  dispatch({ type: USER_LOADING, loading: true });
  axios
    .post("/user/login", { username, password })
    .then(res => {
      if (res.data.status) {
        const { token } = res.data;

        // If token is undefined, dispatch an error and immediately return
        if (!token) {
          dispatch({
            type: USER_LOG_IN_ERROR,
            msg: res.data.msg
              ? res.data.msg
              : "Either your username or password is incorrect. Please try again"
          });
          return;
        }

        // Save token in local storage
        localStorage.setItem("token", token);

        // Set auth header
        setAuthorization(token);

        // Decode JWT token
        var decoded = jwt_decode(token);

        // const { username, email, signUpDate, id } = decoded;
        dispatch(logUserInfo(decoded));
      } else {
        return dispatch({
          type: USER_LOG_IN_ERROR,
          msg: res.data.msg
            ? res.data.msg
            : "Either your username or password is incorrect. Please try again"
        });
      }
    })
    .catch(function(err) {
      dispatch({
        type: USER_LOG_IN_ERROR,
        msg: "There was an error logging you in. Please try again."
      });
    });
};

export const logUserInfo = userData => {
  return {
    type: LOG_IN_USER,
    user: userData
  };
};

export const registerUser = function(userData) {
  return function(dispatch) {
    dispatch({ type: USER_LOADING, loading: true });
    axios
      .post("/user/signup", {
        username: userData.username,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        email: userData.email,
        confirmEmail: userData.confirmEmail
      })
      .then(res => {
        const { status, msg, success, username } = res.data;

        if (status === "fail") {
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
};

// export const registerUser = userData => dispatch => {
//   axios
//     .post("/user/signup", {
//       username: userData.username,
//       password: userData.password,
//       confirmPassword: userData.confirmPassword,
//       email: userData.email,
//       confirmEmail: userData.confirmEmail
//     })
//     .then(res => {
//       const { status, msg, success, username } = res.data;

//       if (status === "fail") {
//         return dispatch({
//           type: USER_SIGN_UP_ERROR,
//           msg: msg
//         });
//       }

//       if (success) {
//         return dispatch({
//           type: USER_SIGN_UP,
//           username
//         });
//       }
//     })
//     .catch(err => {
//       return dispatch({
//         type: USER_SIGN_UP_ERROR,
//         msg: "There was an error with our signup process. Please try again"
//       });
//     });
// };

export const logOutUser = () => {
  localStorage.removeItem("token");
  setAuthorization(null);

  return {
    type: LOG_OUT_USER
  };
};

export const addFavoriteCharacter = character => {
  const { characterID, name, thumbnail } = character;
  return function(dispatch) {
    axios
      .post("/favorites/add/character", {
        characterID,
        name,
        thumbnail
      })
      .then(res => {
        return dispatch({
          type: ADD_FAVORITE_CHARACTER,
          favoriteChacters: res
        });
      })
      .catch(err => {
        // dispatch error here
        console.log(`err: ${err}`);
        return;
      });
  };
};
