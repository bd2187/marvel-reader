import { LOG_IN_USER, LOG_OUT_USER } from "../constants";

const initialState = {
  isLoggedIn: false,
  userData: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return { ...state, isLoggedIn: true, userData: action.user };

    case LOG_OUT_USER:
      return { ...state, isLoggedIn: false, userData: {} };
    default:
      return state;
  }
};

export default userReducer;
