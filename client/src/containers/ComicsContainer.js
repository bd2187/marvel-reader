import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import {
    addFavoriteComic,
    deleteFavoriteComic,
    getAllFavorites
} from "../actions";

import MainContent from "./ContentContainer";
import Grid from "../components/Grid";

import { zeroCheck } from "../utils/dates";

// import favorites actions

class ComicsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateRange: {}
        };

        this.getDateRange = this.getDateRange.bind(this);
        this.fetchComics = this.fetchComics.bind(this);
        this.updateDateRange = this.updateDateRange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.searchComics = this.searchComics.bind(this);
    }

    /**
     *
     *  Once the component mounts, fetch a list of comics that range from today to
     *  three months ago. Also, add the scroll event listener to the document
     *  object
     *
     *  @param
     *  @return
     *
     */
    componentDidMount() {
        var dateRangeObj = this.getDateRange(0, 3);

        // If a query is present, search for the query. Otherwise, fetch regular comics
        this.props.match.params.query
            ? this.searchComics(this.props.match.params.query)
            : this.fetchComics(dateRangeObj);

        this.props.getAllFavorites();

        document.addEventListener("scroll", this.handleScroll);
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
     *  of the webpage, a value exists in dateRange.date1, and we're not in a loading state,
     *  fetch a new list of comics
     *
     *  @param
     *  @return
     *
     */
    handleScroll() {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight &&
            this.state.dateRange.date1 &&
            !this.props.loading
        ) {
            this.fetchComics(this.updateDateRange());
        }
    }

    /**
     *
     *  Calculates the initial date range for fetching the first list
     *  of comics when the component mounts.
     *
     *  @param Number num1
     *  @param Number num2
     *  @return Object
     *
     */
    getDateRange(num1, num2) {
        // Get today's date
        var today = new Date();
        var date = zeroCheck(today.getDate());

        /*
      Get the month based off the integers passed in the params.
      (i.e 0 => This month)
      (i.e 3 => 3 months ago)
    */
        var month1 = zeroCheck(today.getMonth() - num1 + 1);
        var month2 = zeroCheck(today.getMonth() - num2 + 1);
        var year = today.getFullYear();

        return {
            date1: `${year}-${month1}-${date}`,
            date2: `${year}-${month2}-${date}`
        };
    }

    /**
     *
     *  Responsible for updating the date range that will be used
     *  for fetching a brand new list of comics once user reaches
     *  bottom of webpage.
     *
     *  @param
     *  @return Object
     *
     */
    updateDateRange() {
        const { date1, date2 } = this.state.dateRange;

        const formatDate = dateStr => {
            var dateArr = dateStr.split("-").map((item, index) => {
                return index === 1
                    ? zeroCheck(Number(dateStr.split("-")[1]) - 1)
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

    /**
     *
     *  Fetches a list of comics based on the dateRange and updates the component's state
     *
     *  @param Object dateRangeObj
     *  @return
     *
     */

    fetchComics(dateRangeObj) {
        var dateRangeStr = `${dateRangeObj.date2}%2C${dateRangeObj.date1}`;
        this.props.toggleLoading(true);

        axios
            .get(
                `https://gateway.marvel.com/v1/public/comics?dateRange=${dateRangeStr}&limit=50&apikey=7bee794b1db7d98ed6798f95c4bf9865`
            )
            .then(res => {
                this.setState(prevstate => {
                    return {
                        dateRange: dateRangeObj
                    };
                });
                this.props.updateContent([
                    ...this.props.content,
                    ...res.data.data.results
                ]);
                this.props.toggleLoading(false);
            })
            .catch(err => {
                this.props.toggleLoading(false);
            });
    }

    searchComics(query) {
        this.props.updateContent([]);
        this.props.toggleLoading(true);
        this.props.history.push(`/comics/search/${query}`);

        axios
            .get(
                `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${query}&orderBy=onsaleDate&limit=100&apikey=7bee794b1db7d98ed6798f95c4bf9865`
            )
            .then(res => {
                document.removeEventListener("scroll", this.handleScroll);

                this.props.updateContent(res.data.data.results);
                this.props.toggleLoading(false);
            })
            .catch(err => {
                this.props.toggleLoading(false);
            });
    }

    render() {
        return (
            <Grid
                content={this.props.content}
                loading={this.props.loading}
                title={"comics"}
                searchedItemID={this.props.match.params.id}
                history={this.props.history}
                path={this.props.match.path}
                addFavorite={this.props.addFavoriteComic}
                deleteFavorite={this.props.deleteFavoriteComic}
                favorites={this.props.favoriteComics}
                isLoggedIn={this.props.isLoggedIn}
                searchContent={this.searchComics}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        favoriteComics: state.profile.favoriteComics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addFavoriteComic: function(comic) {
            return dispatch(addFavoriteComic(comic));
        },
        deleteFavoriteComic: function(comicID) {
            return dispatch(deleteFavoriteComic(comicID));
        },
        getAllFavorites: function() {
            return dispatch(getAllFavorites());
        }
    };
};

function getDateRange(num1, num2) {
    // Get today's date
    var today = new Date();
    var date = zeroCheck(today.getDate());

    /*
        Get the month based off the integers passed in the params.
        (i.e 0 => This month)
        (i.e 3 => 3 months ago)
    */
    var month1 = zeroCheck(today.getMonth() - num1 + 1);
    var month2 = zeroCheck(today.getMonth() - num2 + 1);
    var year = today.getFullYear();

    return {
        date1: `${year}-${month1}-${date}`,
        date2: `${year}-${month2}-${date}`
    };
}

const initialQueryForContent = getDateRange(0, 3);
const SubscribedComicsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ComicsContainer));

export default MainContent(SubscribedComicsContainer, initialQueryForContent);
