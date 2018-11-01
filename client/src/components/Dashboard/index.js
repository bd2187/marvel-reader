import React from "react";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.css";

import Favorites from "./Favorites";

const Dashboard = props => {
  return (
    <div style={{ padding: "75px 0" }}>
      <Favorites
        category="Characters"
        collection={props.profile.favoriteCharacters}
      />
      <Favorites category="Comics" collection={props.profile.favoriteComics} />

      <div className={styles["more-links-container"]}>
        <Link to="/comics">More Comics</Link>
        <Link to="/characters">More Characters</Link>
      </div>
    </div>
  );
};

export default Dashboard;
