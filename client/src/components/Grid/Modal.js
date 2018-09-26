import React, { Component } from "react";
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
    if (this.props.content.description.split("").length > 250) {
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
          <p>{this.state.shortenedDescription}</p>
          <button
            onClick={() => this.setState({ showShortDescription: false })}
          >
            More
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{this.state.description}</p>
          {this.state.shortenedDescription ? (
            <button
              onClick={() => this.setState({ showShortDescription: true })}
            >
              Less
            </button>
          ) : null}
        </div>
      );
    }
  }

  render() {
    const { content } = this.props;

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
              alt={content.title}
            />
            <h3 style={{ textAlign: "center", fontSize: "14px" }}>
              {content.title}
            </h3>
            <br />
            {this.displayDescription()}
            <br />
            <p style={{ fontSize: "7px" }}>
              Published: {content.dates[0].date}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
