import React from "react";
import styles from "./Grid.module.css";

const Thumbnail = props => {
  const { title, thumbnail, openModal, data } = props;

  const backgroundImg = {
    backgroundImage: `url("${thumbnail.path}.${thumbnail.extension}")`,
    backgroundPoistion: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "162px",
    height: "200px"
  };

  return (
    <li
      className={styles.thumbnail}
      style={backgroundImg}
      onClick={openModal.bind(null, data)}
    >
      <div className={styles["thumbnail-overlay"]} />
      <h4 className={styles["thumbnail-title"]}>{title}</h4>
      {/* // <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} /> */}
    </li>
  );
};

export default Thumbnail;
