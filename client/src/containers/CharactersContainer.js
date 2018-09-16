import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

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
  }

  componentDidMount() {
    this.fetchCharacters("a");

    document.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        this.state.query &&
        !this.state.loading
      ) {
        this.fetchCharacters(this.updateQuery());
      }
    });
  }

  updateQuery() {
    const { query } = this.state;
    const updatedCharCode = query.charCodeAt() + 1;
    return String.fromCharCode(updatedCharCode);
  }

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
    return <Grid content={characters} loading={loading} title={"characters"} />;
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(CharactersContainer);
