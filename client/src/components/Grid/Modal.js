import React, { Component } from "react";
import styles from "./Grid.module.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {}
    };

    this.mountStyle = this.mountStyle.bind(this);
    this.unMountStyle = this.unMountStyle.bind(this);
  }

  componentDidMount() {
    // Mount styles to the modal-container once the component mounts to the DOM
    setTimeout(this.mountStyle, 10);
  }

  mountStyle() {
    // These style scales the modal container to size while in a transition
    this.setState({
      style: {
        width: "calc(70% / 2)",
        height: "calc(80vh / 2)",
        transition: "transform 0.5s ease",
        transform: "scale(2)"
      }
    });
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
            <p>{content.description}</p>
            <br />
            <p style={{ fontSize: "11px" }}>
              Published: {content.dates[0].date}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
