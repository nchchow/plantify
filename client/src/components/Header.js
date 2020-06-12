import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      <h3 className="app-header__logo">PS</h3>
      <nav className="app-header__nav">
        <ul>
          <li>
            <NavLink to="/">Sign In</NavLink>
          </li>
          <li>
            <NavLink to="/">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
