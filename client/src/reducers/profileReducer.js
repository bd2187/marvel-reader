import {
  ADD_FAVORITE_COMIC,
  ADD_FAVORITE_CHARACTER,
  DELETE_FAVORITE_COMIC,
  DELETE_FAVORITE_CHARACTER,
  UPDATE_ALL_FAVORITES
} from "../constants";

const initialState = {
  favoriteCharacters: [],
  favoriteComics: []
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_COMIC:
      return {
        ...state,
        favoriteComics: action.favoriteComics
      };
    case ADD_FAVORITE_CHARACTER:
      return {
        ...state,
        favoriteCharacters: action.favoriteCharacters
      };

    case DELETE_FAVORITE_COMIC:
      return {
        ...state,
        favoriteComics: action.favoriteComics
      };

    case DELETE_FAVORITE_CHARACTER:
      return {
        ...state,
        favoriteCharacters: action.favoriteCharacters
      };

    case UPDATE_ALL_FAVORITES:
      return {
        ...state,
        favoriteComics: action.favoriteComics,
        favoriteCharacters: action.favoriteCharacters
      };
    default:
      return state;
  }
};

export default profileReducer;
