import React, { Component } from "react";
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

  openModal(data) {
    this.setState(() => ({ modalOpen: true, activeData: data }));
  }

  closeModal(evt) {
    // todo: add condition for evt
    [...evt.target.classList].forEach(name => {
      return name.indexOf("modal-overlay") !== -1
        ? this.setState(() => ({ modalOpen: false, activeData: {} }))
        : null;
    });
  }

  render() {
    const { content, loading, title } = this.props;
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
                thumbnail={item.thumbnail}
                openModal={this.openModal}
                data={item}
              />
            );
          })}
        </ul>
        {modalOpen ? (
          <Modal content={activeData} closeModal={this.closeModal} />
        ) : null}
        {loading ? <div className={styles.loader} /> : null}
      </div>
    );
  }
}

export default Grid;
