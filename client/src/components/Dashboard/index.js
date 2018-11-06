import React from "react";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.css";
import { Months } from "../../utils/dates";

import Favorites from "./Favorites";

const displayDate = signUpDate => {
  var d = new Date(signUpDate);
  var month = d.getUTCMonth();
  var date = d.getUTCDate();
  var year = d.getFullYear();

  return `${Months[month]} ${date}, ${year}`;
};

const Dashboard = props => {
  const { user, profile, deleteFavoriteComic, deleteFavoriteCharacter } = props;

  // Todo: render user data
  return (
    <div style={{ padding: "75px 0" }}>
      <div className={styles["user-info-container"]}>
        <h3>Username: {user.userData.username}</h3>
        <h3>Email: {user.userData.email}</h3>
        <p>Member since: {displayDate(user.userData.signUpDate)}</p>
      </div>
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
