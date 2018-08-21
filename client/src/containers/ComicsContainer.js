import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Grid from "../components/Grid";
// import favorites actions

class ComicsContainer extends Component {
  componentDidMount() {
    console.log("fetch comics");
    axios
      .get
      // "http://gateway.marvel.com/v1/public/comics?apikey=7bee794b1db7d98ed6798f95c4bf9865"
      ()
      .then(res => {
        console.log(res.data.data.results);
      });
  }
  render() {
    return <Grid />;
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  null,
  mapDispatchToProps
)(ComicsContainer);
