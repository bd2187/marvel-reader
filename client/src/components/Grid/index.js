import React, { Component } from "react";
import axios from "axios";
import styles from "./Grid.module.css";

import Thumbnail from "./Thumbnail";
import Modal from "./Modal";

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      activeData: {}
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   *
   *  If the id query param isn't passed, immediately return.
   *  Otherwise, fetch the content data with the id passed
   *  into webservice's endpoint.
   *
   *  @param
   *  @return
   */
  componentDidMount() {
    if (!this.props.searchedItemID) return;

    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/${this.props.title}/${
          this.props.searchedItemID
        }?apikey=7bee794b1db7d98ed6798f95c4bf9865`
      )
      .then(res => {
        this.openModal(res.data.data.results[0]);
      });
  }

  /**
   *
   *  If the component updates and an id query param is passed in
   *  the component's props object, search for the content
   *  based off the ID.
   *
   *  @param Object prevProps
   *  @return
   *
   */
  componentDidUpdate(prevProps) {
    if (!this.props.searchedItemID) return;

    if (
      this.props.title === "comics" &&
      prevProps.searchedItemID !== this.props.searchedItemID
    ) {
      axios
        .get(
          `https://gateway.marvel.com:443/v1/public/comics/${
            this.props.searchedItemID
          }?apikey=7bee794b1db7d98ed6798f95c4bf9865`
        )
        .then(res => {
          this.openModal(res.data.data.results[0]);
        });
    }

    if (
      this.props.title === "characters" &&
      prevProps.searchedItemID !== this.props.searchedItemID
    ) {
      axios
        .get(
          `
          https://gateway.marvel.com:443/v1/public/characters/${
            this.props.searchedItemID
          }?apikey=7bee794b1db7d98ed6798f95c4bf9865
          `
        )
        .then(res => {
          this.openModal(res.data.data.results[0]);
        });
    }
  }

  /**
   *
   *  Opens modal with activeData object
   *
   *  @param Object data
   *  @return
   */
  openModal(data) {
    this.setState(() => ({ modalOpen: true, activeData: data }));
  }

  /**
   *
   *  Closes modal and pushes "/comics/" or "/characters" into url history
   *
   *  @param
   *  @return
   */
  closeModal() {
    if (this.props.title === "comics") this.props.history.push("/comics/");
    if (this.props.title === "characters")
      this.props.history.push("/characters/");

    return this.setState(() => ({ modalOpen: false, activeData: {} }));
  }

  render() {
    const {
      content,
      loading,
      title,
      isLoggedIn,
      addFavorite,
      deleteFavorite,
      favorites
    } = this.props;
    const { modalOpen, activeData } = this.state;

    return (
      <div className={styles.wrap}>
        {content.length === 0 && !loading ? <h1>No {title} found</h1> : null}

        <ul className={styles["thumbnail-ul"]}>
          {content.map(item => {
            return (
              <Thumbnail
                key={item.id}
                title={item.title || item.name}
                categoryTitle={title}
                thumbnail={item.thumbnail}
                openModal={this.openModal}
                data={item}
              />
            );
          })}
        </ul>

        {/*
          If modalOpen is true and the url path does not consist of
          an id param in the query string, render the Modal component
        */}
        {modalOpen &&
        this.props.path !== "/comics/" &&
        this.props.path !== "/characters/" ? (
          <Modal
            content={activeData}
            closeModal={this.closeModal}
            isLoggedIn={isLoggedIn}
            addFavorite={addFavorite}
            deleteFavorite={deleteFavorite}
            favorites={favorites}
            title={this.props.title}
          />
        ) : null}
        {loading ? <div className={styles.loader} /> : null}
      </div>
    );
  }
}

export default Grid;
