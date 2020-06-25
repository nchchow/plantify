import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      <div className="container--fluid flex-center">
        <NavLink to="/" className="app-header__logo-link">
          <h3 className="app-header__logo">Plantify</h3>
        </NavLink>
        <nav className="app-header__nav">
          <ul className="app-header__nav--list">
            {/* <li className="app-header__nav--item">
              <NavLink
                to="/upload/new"
                className="app-header__nav--button--upload"
              >
                Upload
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/signup" className="app-header__nav--button--signup">
                Sign Up
              </NavLink>
            </li>
            <li className="app-header__nav--item">
              <NavLink to="/login" className="app-header__nav--button--login">
                Log In
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
