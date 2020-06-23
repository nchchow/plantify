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
            <li className="app-header__nav--item">
              <NavLink
                to="/upload/new"
                className="app-header__nav--upload-button"
              >
                Upload
              </NavLink>
            </li>
            {/* <li className="app-header__nav--item">
              <NavLink to="/" className="app-header__nav--link">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="app-header__nav--link">
                Sign Up
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
