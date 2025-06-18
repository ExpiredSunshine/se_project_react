import { useContext } from "react";
import { Link } from "react-router-dom";

// Contexts -----
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Assets & Styles -----
import logo from "../../assets/logo.png";
import "./Header.css";

// UI Components -----
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

// Header Component -----
export default function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  // Current user from context -----
  const currentUser = useContext(CurrentUserContext);

  // Current date display -----
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
        type="button"
        className="header__add-clothes-btn"
        onClick={handleAddClick}
      >
        + Add Clothes
      </button>

      {isLoggedIn && currentUser && (
        <div className="header__user-container">
          <p className="header__username">{currentUser.data.name}</p>
          <Link to="/profile">
            {currentUser.data.avatar ? (
              <img
                src={currentUser.data.avatar}
                alt={currentUser.data.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar header__avatar--placeholder">
                {currentUser.data.name.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
