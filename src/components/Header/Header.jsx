import { useState } from "react";
import headerLogo from "../../images/headerLogo.png";
import userAvatar from "../../images/user_avatar.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ onAddGarment, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [value, setValue] = useState(false);

  return (
    <header className="header">
      <div className="header__logo-location">
        <Link to="/" className="header__link">
          <img
            src={headerLogo}
            alt="App Logo"
            className="header__logo"
          />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <div className="header__nav">
          <ToggleSwitch
            isOn={value}
            handleToggle={() => setValue(!value)}
          />
          <button
            onClick={onAddGarment}
            type="button"
            className="header__button">
            <span className="header__button-text">+ Add clothes</span>
          </button>
        </div>
        <Link to="/profile" className="header__link">
          <div className="header__profile">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={userAvatar}
              alt="Avatar"
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
