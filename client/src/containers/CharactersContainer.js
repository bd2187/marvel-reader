import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addFavoriteCharacter, getAllFavorites } from "../actions";

import Grid from "../components/Grid";

class CharactersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      loading: false,
      query: ""
    };

    this.fetchCharacters = this.fetchCharacters.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  /**
   *
   *  Once the component mounts, fetch a list of characters who's names
   *  start with the letter "a". Add the scroll event listener to the
   *  document object.
   *  @param
   *  @return
   *
   */
  componentDidMount() {
    this.fetchCharacters("a");
    document.addEventListener("scroll", this.handleScroll);

    this.props.getAllFavorites();
  }

  /**
   *
   *  Remove the scroll event listener from the document object
   *  document object.
   *  @param
   *  @return
   *
   */
  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  /**
   *
   *  This serves as the callback function for the scroll event
   *  attached to the document object. If a user reaches the bottom
   *  of the webpage, a query exists, and we're not in a loading state, fetch
   *  a new list of characters
   *
   *  @param
   *  @return
   *
   */
  handleScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.state.query &&
      !this.state.loading
    ) {
      this.fetchCharacters(this.updateQuery());
    }
  }

  /**
   *
   *  Uses the existing query living in this.state.query (i.e "a"),
   *  and updates the query by moving up one letter in the alphabet (i.e "b").
   *
   *  @param
   *  @return String (letter of query)
   *
   */
  updateQuery() {
    const { query } = this.state;
    const updatedCharCode = query.charCodeAt() + 1;
    return String.fromCharCode(updatedCharCode);
  }

  /**
   *
   *  Fetches a list of characters based on the query and updates the component's
   *  state.
   *
   *  @param String query
   *  @return
   *
   */
  fetchCharacters(query) {
    this.setState({ loading: true, query });
    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&orderBy=-name&limit=50&apikey=7bee794b1db7d98ed6798f95c4bf9865
    `
      )
      .then(res => {
        this.setState(prevState => {
          return {
            characters: [...prevState.characters, ...res.data.data.results],
            loading: false
          };
        });
      });
  }

  render() {
    const { characters, loading } = this.state;
    return (
      <Grid
        content={characters}
        loading={loading}
        title={"characters"}
        searchedItemID={this.props.match.params.id}
        history={this.props.history}
        path={this.props.match.path}
        addFavorite={this.props.addFavoriteCharacter}
        // deleteFavorite={this.props.deleteFavoriteComic}
        favorites={this.props.favoriteCharacters}
        isLoggedIn={this.props.isLoggedIn}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    favoriteCharacters: state.profile.favoriteCharacters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFavoriteCharacter: function(character) {
      return dispatch(addFavoriteCharacter(character));
    },

    getAllFavorites: function() {
      return dispatch(getAllFavorites());
    }

    // deleteFavoriteCharacter: function() {

    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CharactersContainer));
