import React from "react";

const Favorites = props => {
  const { category, collection } = props;
  return (
    <div>
      {Object.keys(collection).length === 0 ? (
        <p>You have no favorite {category.toLowerCase()} at the moment</p>
      ) : (
        <h1>Favorite {category}</h1>
      )}

      {/* display collection here */}
    </div>
  );
};

export default Favorites;
