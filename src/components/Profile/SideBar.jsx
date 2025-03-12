import React, { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, setIsLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  return (
    <div className="sidebar">
      <section className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar || avatar} // fallback to default avatar
          alt="User Avatar"
        />
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
