import React from "react";
import styles from "./Grid.module.css";

const Thumbnail = props => {
  const { title, thumbnail } = props;
  return (
    <li className={styles.thumbnail}>
      <div className={styles["thumbnail-overlay"]} />
      <h4 className={styles["thumbnail-title"]}>{title}</h4>
      <img src={`${thumbnail.path}.${thumbnail.extension}`} />
    </li>
  );
};

export default Thumbnail;
