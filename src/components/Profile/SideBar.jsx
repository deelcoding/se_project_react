import "./SideBar.css";
import avatar from "../../images/user_avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={avatar}
        alt="User Avatar"
      />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
