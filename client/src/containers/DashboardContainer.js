import React, { Component } from "react";

import { connect } from "react-redux";
import {
  getAllFavorites,
  deleteFavoriteComic,
  deleteFavoriteCharacter
} from "../actions";

import Dashboard from "../components/Dashboard";

class DashboardContainer extends Component {
  componentDidMount() {
    this.props.fetchFavorites();
  }
  render() {
    const {
      user,
      profile,
      deleteFavoriteComic,
      deleteFavoriteCharacter
    } = this.props;
    return (
      <Dashboard
        user={user}
        profile={profile}
        deleteFavoriteComic={deleteFavoriteComic}
        deleteFavoriteCharacter={deleteFavoriteCharacter}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFavorites: function() {
      dispatch(getAllFavorites());
    },
    deleteFavoriteComic: function(comicID) {
      dispatch(deleteFavoriteComic(comicID));
    },
    deleteFavoriteCharacter: function(characterID) {
      dispatch(deleteFavoriteCharacter(characterID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
