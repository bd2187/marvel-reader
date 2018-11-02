import React from "react";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.css";

import Favorites from "./Favorites";

const Dashboard = props => {
  const { user, profile, deleteFavoriteComic, deleteFavoriteCharacter } = props;

  // Todo: render user data
  return (
    <div style={{ padding: "75px 0" }}>
      <Favorites
        category="Characters"
        collection={profile.favoriteCharacters}
        deleteFromFaveList={deleteFavoriteCharacter}
      />
      <Favorites
        category="Comics"
        collection={profile.favoriteComics}
        deleteFromFaveList={deleteFavoriteComic}
      />

      <div className={styles["more-links-container"]}>
        <Link to="/comics">More Comics</Link>
        <Link to="/characters">More Characters</Link>
      </div>
    </div>
  );
};

export default Dashboard;
