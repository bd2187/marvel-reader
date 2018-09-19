import {
  LOG_IN_USER,
  LOG_OUT_USER,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP,
  USER_LOG_IN_ERROR,
  USER_SIGN_UP_LOADING
} from "../constants";

const initialState = {
  isLoggedIn: false,
  loading: false,
  userData: {},
  errors: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return { ...state, isLoggedIn: true, userData: action.user, errors: {} };

    case LOG_OUT_USER:
      return { ...state, isLoggedIn: false, userData: {}, errors: {} };

    case USER_SIGN_UP_LOADING:
      return { ...state, loading: action.loading };

    case USER_SIGN_UP:
      return {
        ...state,
        userData: { username: action.username, signUpSuccess: true },
        errors: {},
        loading: false
      };

    case USER_SIGN_UP_ERROR:
      return {
        ...state,
        errors: { error: true, msg: action.msg },
        loading: false
      };

    case USER_LOG_IN_ERROR:
      return {
        ...state,
        errors: { error: true, msg: action.msg },
        loading: false
      };

    default:
      return state;
  }
};

export default userReducer;
