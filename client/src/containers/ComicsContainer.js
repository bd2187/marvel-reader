import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Grid from "../components/Grid";
// import favorites actions

class ComicsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: [],
      loading: false,
      dateRange: {}
    };

    this.getDateRange = this.getDateRange.bind(this);
    this.fetchComics = this.fetchComics.bind(this);
    this.updateDateRange = this.updateDateRange.bind(this);
  }

  componentDidMount() {
    var dateRangeObj = this.getDateRange(0, 3);

    this.fetchComics(dateRangeObj);

    document.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        this.state.dateRange.date1 &&
        !this.state.loading
      ) {
        this.fetchComics(this.updateDateRange());
      }
    });
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

  zeroCheck(num) {
    return num >= 10 ? num : "0" + num;
  }

  updateDateRange() {
    const { date1, date2 } = this.state.dateRange;

    const formatDate = dateStr => {
      var dateArr = dateStr.split("-").map((item, index) => {
        return index === 1
          ? this.zeroCheck(Number(dateStr.split("-")[1]) - 1)
          : item;
      });

      if (dateArr[1] === "00") {
        dateArr[0] = Number(dateArr[0]) - 1;
        dateArr[1] = "12";
      }

      return dateArr.join("-");
    };

    return {
      date1: formatDate(date1),
      date2: formatDate(date2)
    };
  }

  fetchComics(dateRangeObj) {
    var dateRangeStr = `${dateRangeObj.date2}%2C${dateRangeObj.date1}`;
    this.setState({ loading: true });

    axios
      .get(
        `https://gateway.marvel.com/v1/public/comics?dateRange=${dateRangeStr}&limit=50&apikey=7bee794b1db7d98ed6798f95c4bf9865`
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
    // console.log(this.props.match.params.id);
    return (
      <Grid
        content={comics}
        loading={loading}
        title={"comics"}
        searchedItemID={this.props.match.params.id}
        history={this.props.history}
      />
    );
  }
}

// todo: map action for favoriting comic
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  null,
  mapDispatchToProps
)(withRouter(ComicsContainer));
