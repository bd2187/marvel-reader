import React from "react";
import styles from "./NavBar.module.css";

const toggleNav = e => {
  console.log(e.target);
  this.classList.toggle("change");
};

const NavBar = props => {
  const { user, logOut } = props;

  return (
    <div className={styles["navbar-container"]}>
      {/* {user.isLoggedIn ? <button onClick={logOut}>logout</button> : null} */}

      <div className={styles["hamburger-icon"]} onClick={toggleNav}>
        <div className={styles.bar1} />
        <div className={styles.bar2} />
        <div className={styles.bar3} />
      </div>
    </div>
  );
};

export default NavBar;
