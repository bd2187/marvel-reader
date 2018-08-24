import { ADD_FAVORITE_CHARACTER } from "../constants";

const initialState = {
  favoriteCharacters: {},
  favoriteComics: {}
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_CHARACTER:
      return {
        ...state,
        favoriteCharacters: action.favoriteCharacters
      };
    default:
      return state;
  }
};

export default profileReducer;
