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
      loading: true,
      dateRange: {}
    };

    this.getDateRange = this.getDateRange.bind(this);
  }

  zeroCheck(num) {
    return num >= 10 ? num : "0" + num;
  }

  getDateRange(num1, num2) {
    var today = new Date();
    var date = this.zeroCheck(today.getDate());
    var month1 = this.zeroCheck(today.getMonth() - num1 + 1);
    var month2 = this.zeroCheck(today.getMonth() - num2 + 1);
    var year = today.getFullYear();

    return {
      date1: `${year}-${month1}-${date}`,
      date2: `${year}-${month2}-${date}`
    };
  }

  componentDidMount() {
    console.log("fetch comics");

    var dateRangeObj = this.getDateRange(0, 3);
    var dateRangeStr = `${dateRangeObj.date2}%2C${dateRangeObj.date1}`;

    axios
      .get(
        `http://gateway.marvel.com/v1/public/comics?dateRange=${dateRangeStr}&limit=50&apikey=7bee794b1db7d98ed6798f95c4bf9865`
      )
      .then(res => {
        this.setState(prevstate => {
          return {
            comics: [...prevstate.comics, ...res.data.data.results],
            loading: false,
            dateRange: dateRangeObj
          };
        });
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
