import React, { Component } from "react";

function Favorites(props) {
  const { category, collection } = props;

  return (
    <div>
      {collection && Object.keys(collection).length === 0 ? (
        <p>You have no favorite {category.toLowerCase()} at the moment</p>
      ) : (
        <h1>Favorite {category}</h1>
      )}

      {/* display collection here */}
    </div>
  );
}

export default Favorites;
