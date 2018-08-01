const initialState = {
  favoriteCharacters: {},
  favoriteComics: {}
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVORITE_COMIC":
      return state;
    default:
      return state;
  }
};

export default profileReducer;
