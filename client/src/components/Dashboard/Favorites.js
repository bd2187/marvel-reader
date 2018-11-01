import React from "react";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.css";

const Favorites = props => {
  const { category, collection } = props;

  return (
    <div className={styles["favorites-wrap"]}>
      {collection && Object.keys(collection).length === 0 ? (
        <p className={styles["no-favorites-message"]}>
          You have no favorite {category.toLowerCase()} at the moment
        </p>
      ) : (
        <div className={styles["category-container"]}>
          <h1>Favorite {category}</h1>

          <ul className={styles["favorites-container"]}>
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
                <li
                  className={styles["favorites-item"]}
                  key={item.characterID || item.comicID}
                >
                  <Link className={styles["favename"]} to={linkToFave}>
                    <h3>{faveName}</h3>
                  </Link>
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
