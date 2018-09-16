import React from "react";
import styles from "./Grid.module.css";

const Modal = props => {
  const { content, closeModal } = props;

  console.log(content);

  return (
    <div className={styles["modal-overlay"]} onClick={closeModal}>
      <div className={styles["modal-container"]}>
        <div style={{ width: "50%" }}>
          <img
            style={{ width: "100%" }}
            src={`${content.thumbnail.path}.jpg`}
            alt={content.title}
          />
        </div>
        <h1>{content.title}</h1>
        <br />
        <p>{content.description}</p>
        <br />
        <p>Published: {content.dates[0].date}</p>
      </div>
    </div>
  );
};

export default Modal;
