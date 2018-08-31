import React, { Component } from "react";
import HamburgerIcon from "./HamburgerIcon";
import styles from "./NavBar.module.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState(prevState => {
      return { navbarOpen: !prevState.navbarOpen };
    });
  }

  render() {
    const { user, logOut } = this.props;

    return (
      <div className={styles["navbar-container"]}>
        {/* {user.isLoggedIn ? <button onClick={logOut}>logout</button> : null} */}
        <HamburgerIcon
          toggleNav={this.toggleNav}
          navbarOpen={this.state.navbarOpen}
        />
        <p>logo</p>
      </div>
    );
  }
}

export default NavBar;
