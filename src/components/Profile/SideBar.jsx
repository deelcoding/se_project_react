import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, setIsLoggedIn, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  // const { user } = useContext(CurrentUserContext) || {};

  // const handleLogout = () => {
  //   localStorage.removeItem("jwt");
  //   setIsLoggedIn(false);
  //   navigate("/"); // redirect after logout (you can choose another route)
  // };

  // Get the user's initial or fallback to "U" for "User"
  const getInitial = () => {
    return currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="sidebar">
      <section className="sidebar__profile">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="User Avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{getInitial()}</div>
        )}
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </section>

      <section className="sidebar__edit-profile">
        <button
          onClick={onEditProfile}
          type="button"
          className="sidebar__button sidebar__button__edit-profile">
          <span className="sidebar__button-text">Change profile data</span>
        </button>

        <button
          onClick={handleLogout}
          type="button"
          className="sidebar__button sidebar__button-logout">
          <span className="sidebar__button-text">Log out</span>
        </button>
      </section>
    </div>
  );
}

export default SideBar;
