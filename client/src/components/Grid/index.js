import React, { Component } from "react";
import Thumbnail from "./Thumbnail";
import styles from "./Grid.module.css";

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };

    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState(() => ({ modalOpen: true }));
  }

  render() {
    const { content, loading, title } = this.props;
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
              />
            );
          })}
        </ul>
        {loading ? <div className={styles.loader} /> : null}
      </div>
    );
  }
}

export default Grid;
