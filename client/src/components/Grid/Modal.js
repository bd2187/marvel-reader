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
        transition: "transform 1s ease",
        transform: "scale(2)"
      }
    });
  }

  unMountStyle(e) {
    /*
     When user closes the modal, transition the scale of the
     modal container prior to fully closing the modal.
     */
    this.setState({
      style: {
        width: "0",
        height: "0",
        transition: "transform 1s ease",
        transform: "scale(0)"
      }
    });

    var eventTarget = e.target;

    setTimeout(() => {
      this.props.closeModal(eventTarget);
    }, 300);
  }

  render() {
    const { content } = this.props;

    return (
      <div
        className={styles["modal-overlay"]}
        onClick={e => this.unMountStyle(e)}
      >
        <div className={styles["modal-container"]} style={this.state.style}>
          <img
            style={{ width: "50%", display: "block", margin: "1em auto" }}
            src={`${content.thumbnail.path}.jpg`}
            alt={content.title}
          />
          <h3 style={{ textAlign: "center" }}>{content.title}</h3>
          <br />
          <p>{content.description}</p>
          <br />
          <p>Published: {content.dates[0].date}</p>
        </div>
      </div>
    );
  }
}

export default Modal;
