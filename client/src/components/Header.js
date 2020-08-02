import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = (event) => {
    axios.get("/logout").then((res) => {
      sessionStorage.isLoggedIn = false;
      setIsLoggedIn(false);
    });
  };

  return (
    <header className="app-header">
      <div className="container--fluid flex-center">
        <NavLink to="/" className="app-header__logo-link">
          <h3 className="app-header__logo">Plantify</h3>
        </NavLink>
        <nav className="app-header__nav">
          <ul className="app-header__nav--list">
            {isLoggedIn && (
              <>
                <li className="app-header__nav--item">
                  <a
                    className="app-header__nav--button app-header__nav--button--logout"
                    onClick={handleLogout}
                  >
                    Log Out
                  </a>
                </li>
                <li className="app-header__nav--item">
                  <NavLink
                    to="/upload/new"
                    className="app-header__nav--button app-header__nav--button--upload"
                  >
                    Upload
                  </NavLink>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="app-header__nav--item">
                  <NavLink
                    to="/signup"
                    className="app-header__nav--button app-header__nav--button--signup"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li className="app-header__nav--item">
                  <NavLink
                    to="/login"
                    className="app-header__nav--button app-header__nav--button--login"
                  >
                    Log In
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
