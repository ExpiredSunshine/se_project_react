import { Link } from "react-router-dom";
import { useContext } from "react";
import "./SideBar.css";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ isLoggedIn, onSignOutClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      {isLoggedIn && currentUser && (
        <div className="sidebar__user-container">
          {currentUser.data.avatar ? (
            <img
              src={currentUser.data.avatar}
              alt={currentUser.data.name}
              className="sidebar__avatar"
            />
          ) : (
            <div className="sidebar__avatar sidebar__avatar--placeholder">
              {currentUser.data.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      )}
      <p className="sidebar__username">{currentUser.data.name}</p>

      <div className="sidebar__footer">
        <button
          type="button"
          className="sidebar__button"
          onClick={onSignOutClick}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__button"
          onClick={onSignOutClick}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
