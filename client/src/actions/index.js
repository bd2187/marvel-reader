import {
  LOG_IN_USER,
  LOG_OUT_USER,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP,
  USER_LOG_IN_ERROR,
  ADD_FAVORITE_CHARACTER,
  ADD_FAVORITE_COMIC,
  DELETE_FAVORITE_COMIC,
  DELETE_FAVORITE_CHARACTER,
  USER_LOADING,
  UPDATE_ALL_FAVORITES
} from "../constants";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthorization from "../utils/setAuthorization";
import ajax from "../utils/ajax";

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

export const addFavoriteComic = comic => {
  const { comicID, title, published, description, thumbnail } = comic;

  return function(dispatch) {
    ajax(
      "post",
      "/favorites/add/comic",
      { comicID, title, published, description, thumbnail },
      function(res) {
        return dispatch({
          type: ADD_FAVORITE_COMIC,
          favoriteComics: res.data.comics
        });
      }
    );
  };
};

export const addFavoriteCharacter = character => {
  const { characterID, name, thumbnail } = character;

  return function(dispatch) {
    ajax(
      "post",
      "/favorites/add/character",
      { characterID, name, thumbnail },
      function(res) {
        return dispatch({
          type: ADD_FAVORITE_CHARACTER,
          favoriteCharacters: res.data.characters
        });
      }
    );
  };
};

export const deleteFavoriteComic = comicID => dispatch => {
  ajax("delete", "/favorites/delete/comic", { data: { comicID } }, function(
    res
  ) {
    return dispatch({
      type: DELETE_FAVORITE_COMIC,
      favoriteComics: res.data.comics
    });
  });
};

export const deleteFavoriteCharacter = characterID => dispatch => {
  ajax(
    "delete",
    "/favorites/delete/character",
    { data: { characterID } },
    function(res) {
      return dispatch({
        type: DELETE_FAVORITE_CHARACTER,
        favoriteCharacters: res.data.characters
      });
    }
  );
};
export const getAllFavorites = () => {
  return function(dispatch) {
    ajax("get", "/favorites/all", null, function(res) {
      dispatch({
        type: UPDATE_ALL_FAVORITES,
        favoriteComics: res.data.comics,
        favoriteCharacters: res.data.characters
      });
    });
  };
};
