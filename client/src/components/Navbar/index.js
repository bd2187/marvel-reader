import React, { Component } from "react";
import HamburgerIcon from "./HamburgerIcon";
import SideNav from "./SideNav";
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

  componentDidMount() {
    // Hide or display navigation menu onscroll
    var prevScrollPos = window.pageYOffset;

    window.onscroll = () => {
      var currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        document.getElementById("navBar").style.top = "0";
      } else {
        document.getElementById("navBar").style.top = "-75px";

        this.setState(() => {
          return { navbarOpen: false };
        });
      }
      prevScrollPos = currentScrollPos;
    };
  }

  render() {
    const { user, logOut } = this.props;

    return (
      <div>
        <div className={styles["navbar-container"]} id="navBar">
          {/* {user.isLoggedIn ? <button onClick={logOut}>logout</button> : null} */}
          <HamburgerIcon
            toggleNav={this.toggleNav}
            navbarOpen={this.state.navbarOpen}
          />
          <p>logo</p>
        </div>
        <SideNav
          navbarOpen={this.state.navbarOpen}
          user={user}
          logOut={logOut}
          toggleNav={this.toggleNav}
        />
      </div>
    );
  }
}

export default NavBar;
