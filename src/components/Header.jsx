import headerLogo from "../images/headerLogo.png";
import "../blocks/header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header() {
  return (
    <div className="header">
      <img
        src={headerLogo}
        alt="App Logo"
        className="header__logo"
      />
      (Date(currentDate))
      <button className="header__button"> + Add Clothes</button>

    </div>
  );
}

export default Header;
