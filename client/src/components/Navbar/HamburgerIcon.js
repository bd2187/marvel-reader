import React from "react";
import styles from "./NavBar.module.css";

const HamburgerIcon = props => {
  const { toggleNav, navbarOpen } = props;
  return (
    <div
      className={
        navbarOpen ? styles["hamburger-icon-open"] : styles["hamburger-icon"]
      }
      onClick={toggleNav}
    >
      <div className={styles.barsContainer}>
        <div className={styles.bar1} />
        <div className={styles.bar2} />
        <div className={styles.bar3} />
      </div>
    </div>
  );
};

export default HamburgerIcon;
