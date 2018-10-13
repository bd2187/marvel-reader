import React, { Component } from "react";
import axios from "axios";
import styles from "./Grid.module.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      description: "",
      shortenedDescription: "",
      showShortDescription: false
    };

    this.mountStyle = this.mountStyle.bind(this);
    this.unMountStyle = this.unMountStyle.bind(this);
    this.displayDescription = this.displayDescription.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    // Mount styles to the modal-container once the component mounts to the DOM
    setTimeout(this.mountStyle, 10);
  }

  /**
   *
   *  Responsible for scaling the modal once open. Also responsible
   *  for storing a short version of the content's description
   *  inside the component's state
   *
   *  @param
   *  @return
   *
   */
  mountStyle() {
    // These style scales the modal container to size while in a transition
    const style = {
      width: "calc(70% / 2)",
      height: "calc(80vh / 2)",
      transition: "transform 0.5s ease",
      transform: "scale(2)"
    };

    /*
      If the content's description is more than 250 characters long,
      include a short version of the description in the component's state.
      Otherwise, don't include a short version
    */
    if (
      this.props.content.description &&
      this.props.content.description.split("").length > 250
    ) {
      let shortenedDescription =
        this.props.content.description
          .split("")
          .slice(0, 250)
          .join("") + "...";

      this.setState({
        description: this.props.content.description,
        showShortDescription: true,
        shortenedDescription,
        style
      });
    } else {
      this.setState({ description: this.props.content.description, style });
    }
  }

  unMountStyle(e) {
    /*
     When user closes the modal, transition the scale of the
     modal container prior to fully closing the modal.
    */

    [...e.target.classList].forEach(name => {
      if (
        name.indexOf("modal-overlay") !== -1 ||
        name.indexOf("modal-exit-btn") !== -1
      ) {
        this.setState({
          style: {
            width: "0",
            height: "0",
            transition: "transform 0.5s ease",
            transform: "scale(0)"
          }
        });

        setTimeout(() => {
          this.props.closeModal();
        }, 300);
      }
    });
  }

  /**
   *
   *  Dictates whether or not the short description for the content
   *  should be displayed
   *
   *  @param
   *  @return
   *
   */
  displayDescription() {
    if (this.state.showShortDescription) {
      return (
        <div>
          <p className={styles["content-description"]}>
            {this.state.shortenedDescription}
          </p>
          <button
            className={styles["toggle-description-btn"]}
            onClick={() => this.setState({ showShortDescription: false })}
          >
            More
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p className={styles["content-description"]}>
            {this.state.description}
          </p>
          {this.state.shortenedDescription ? (
            <button
              className={styles["toggle-description-btn"]}
              onClick={() => this.setState({ showShortDescription: true })}
            >
              Less
            </button>
          ) : null}
        </div>
      );
    }
  }

  displayCharactersComics(charactersComics) {
    const fetchStuff = url => {
      axios
        .get(
          `${url.replace(
            "http",
            "https"
          )}?apikey=7bee794b1db7d98ed6798f95c4bf9865`
        )
        .then(res => console.log(res.data.data.results[0]))
        .catch(err => console.log(err));
    };

    return (
      <ul>
        {charactersComics.map(comic => {
          return (
            <li
              style={{ fontSize: "7px" }}
              key={comic.name}
              onClick={fetchStuff.bind(null, comic.resourceURI)}
            >
              {comic.name}
            </li>
          );
        })}
      </ul>
    );
  }

  /**
   *
   *  Renders the favorite button and determines
   *  whether or not to delete/add the content
   *  to the users favorites list. Dispatches
   *  addFavorite and deleteFavorite fns
   *
   *  @param Object content
   *  @param  Array favorites
   *  @return Object React element
   *
   */
  handleFavorite(content, favorites) {
    var isFavorite;
    var { addFavorite, deleteFavorite } = this.props;

    // Determine if the content is already in the user's favorites
    if (favorites && favorites.length > 0) {
      var filteredFavorites = favorites.filter(function(item) {
        return Number(item.comicID) === Number(content.id) ? item : null;
      });

      isFavorite = filteredFavorites.length > 0;
    }

    return (
      <div
        className={`${styles["heart-container"]} ${
          isFavorite ? styles["favorite"] : styles["non-favorite"]
        }`}
        /*
          If isFavorite is true, have the cb fn invoke deleteFavorite. Otherwise,
          invoke addFavorite
        */
        onClick={() => {
          return isFavorite
            ? deleteFavorite(content.id)
            : addFavorite({
                comicID: content.id,
                title: content.title,
                published: content.dates[0].date,
                description: content.description
              });
        }}
      >
        <i className="fa fa-heart" />
      </div>
    );
  }

  render() {
    const { content, isLoggedIn, favorites } = this.props;

    return (
      <div
        className={`${styles["modal-overlay"]}`}
        onClick={e => this.unMountStyle(e)}
      >
        <div className={styles["modal-container"]} style={this.state.style}>
          <span
            className={styles["modal-exit-btn"]}
            onClick={e => this.unMountStyle(e)}
          >
            X
          </span>
          <div className={styles["modal-overflow"]}>
            <img
              className={styles["comic-cover"]}
              src={`${content.thumbnail.path}.jpg`}
              alt={content.title || content.name}
            />
            <h3 style={{ textAlign: "center", fontSize: "14px" }}>
              {content.title || content.name}
            </h3>
            <br />
            {this.displayDescription()}
            <br />
            {content.dates ? (
              <p style={{ fontSize: "7px" }}>
                Published: {content.dates[0].date}
              </p>
            ) : null}
            {content.comics && content.comics.items
              ? this.displayCharactersComics(content.comics.items)
              : null}

            {/* If the user is logged in, render the favorite button*/}
            {isLoggedIn ? this.handleFavorite(content, favorites) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
