import React from "react";
import { Link } from "react-router-dom";

import Favorites from "./Favorites";

const Dashboard = props => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Favorites
        category="Characters"
        collection={props.profile.favoriteCharacters}
      />
      <Favorites category="Comics" collection={props.profile.favoriteComics} />

      <Link to="/comics">More Comics</Link>
      <Link to="/characters">More Characters</Link>
    </div>
  );
};

export default Dashboard;
