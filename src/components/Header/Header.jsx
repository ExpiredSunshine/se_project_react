import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

export default function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  onSignOutClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      {!isLoggedIn && (
        <div className="header__auth-buttons">
          <button
            type="button"
            className="header__button header__button--primary"
            onClick={onRegisterClick}
          >
            Sign up
          </button>
          <button
            type="button"
            className="header__button"
            onClick={onLoginClick}
          >
            Log in
          </button>
        </div>
      )}
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      {isLoggedIn && currentUser && (
        <div className="header__user-container">
          <Link to="/profile">
            <img
              src={currentUser.data.avatar}
              alt={currentUser.data.name}
              className="header__avatar"
            />
          </Link>
          <p className="header__username">{currentUser.data.name}</p>
          <button
            type="button"
            className="header__button"
            onClick={onSignOutClick}
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  );
}
