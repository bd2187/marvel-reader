import React from "react";
import { Link } from "react-router-dom";

const Favorites = props => {
  const { category, collection } = props;

  return (
    <div>
      {collection && Object.keys(collection).length === 0 ? (
        <p>You have no favorite {category.toLowerCase()} at the moment</p>
      ) : (
        <div>
          <h1>Favorite {category}</h1>

          <ul>
            {collection.map(function(item) {
              let linkToFave;
              let faveName;

              if (category.toLowerCase() === "characters") {
                linkToFave = `/characters/${item.characterID}`;
                faveName = item.name;
              } else if (category.toLowerCase() === "comics") {
                linkToFave = `/comics/${item.comicID}`;
                faveName = item.title;
              }

              return (
                <li key={item.characterID || item.comicID}>
                  <h3>{faveName}</h3>
                  <Link to={linkToFave}>
                    <img src={item.thumbnail} alt={faveName} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Favorites;
