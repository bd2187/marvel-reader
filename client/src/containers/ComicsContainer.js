import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Grid from "../components/Grid";
// import favorites actions

class ComicsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: [],
      loading: true
    };
  }

  componentDidMount() {
    console.log("fetch comics");

    axios
      .get(
        "http://gateway.marvel.com/v1/public/comics?limit=50&orderBy=title&apikey=7bee794b1db7d98ed6798f95c4bf9865"
      )
      .then(res => {
        this.setState({ comics: res.data.data.results, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  }
  render() {
    const { comics, loading } = this.state;
    return <Grid content={comics} loading={loading} title={"comics"} />;
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  null,
  mapDispatchToProps
)(ComicsContainer);
