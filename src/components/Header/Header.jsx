import React from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const locationName = "New York";

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Logo" />
      <p className="header__date-and-location">
        {currentDate}, {locationName}
      </p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__username">User Name</p>
        <img src={avatar} alt="Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
