import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const SideNav = props => {
  const { navbarOpen, user, toggleNav, logOut } = props;
  return (
    <div
      id={styles.sideNav}
      className={navbarOpen ? styles["sidenav-open"] : styles["sidenav-close"]}
    >
      {user.isLoggedIn ? (
        <Link
          className={styles["sidenav-link"]}
          to="/dashboard"
          onClick={toggleNav}
        >
          Profile
        </Link>
      ) : (
        <Link className={styles["sidenav-link"]} to="/" onClick={toggleNav}>
          Sign In
        </Link>
      )}

      <Link className={styles["sidenav-link"]} to="/comics" onClick={toggleNav}>
        Comics
      </Link>
      <Link
        className={styles["sidenav-link"]}
        to="/characters"
        onClick={toggleNav}
      >
        Characters
      </Link>
      {user.isLoggedIn ? (
        <span className={styles["sidenav-link"]} onClick={logOut}>
          LogOut
        </span>
      ) : null}
    </div>
  );
};

export default SideNav;
