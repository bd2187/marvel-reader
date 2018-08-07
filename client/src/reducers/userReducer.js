import {
  LOG_IN_USER,
  LOG_OUT_USER,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP
} from "../constants";

const initialState = {
  isLoggedIn: false,
  userData: {},
  errors: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return { ...state, isLoggedIn: true, userData: action.user, errors: {} };

    case LOG_OUT_USER:
      return { ...state, isLoggedIn: false, userData: {}, errors: {} };

    case USER_SIGN_UP:
      return { ...state, userData: { username: action.username }, errors: {} };

    case USER_SIGN_UP_ERROR:
      return { ...state, errors: { error: true, msg: action.msg } };

    default:
      return state;
  }
};

export default userReducer;
