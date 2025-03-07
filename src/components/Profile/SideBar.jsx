import "./SideBar.css";
import avatar from "../../images/user_avatar.png";

function SideBar({ onEditProfile, setIsLoggedIn }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="sidebar">
      <section className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src={avatar}
          alt="User Avatar"
        />
        <p className="sidebar__username">Terrence Tegegne</p>
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
