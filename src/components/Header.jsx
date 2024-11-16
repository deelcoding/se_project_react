import headerLogo from "../images/headerLogo.png";
import "../blocks/header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header() {
  return (
    <div className="header">
      <span className="header__left">
        <img
          src={headerLogo}
          alt="App Logo"
          className="header__logo"
        />
        (Date(currentDate))
      </span>
      <span className="header__right">
        <button className="header__button">+ Add Clothes</button>
        <p className="header__name">Terrence Tegegne</p>
        <img
          src="#"
          alt="Avatar"
          className="header__avatar"
        />
      </span>
    </div>
  );
}

export default Header;
