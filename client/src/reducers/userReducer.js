import { LOG_IN_USER } from "../constants";

const initialState = {
  isLoggedIn: false,
  userData: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return { ...state, isLoggedIn: true, userData: action.user };
    default:
      return state;
  }
};

export default userReducer;
