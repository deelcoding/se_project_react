import { useState, useContext } from "react";
import headerLogo from "../../images/headerLogo.png";
import userAvatar from "../../images/user_avatar.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ onSignUp, onLogIn, onAddGarment, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [value, setValue] = useState(false);
  const { user } = useContext(CurrentUserContext) || {};
  const currentUser = useContext(CurrentUserContext);

  const renderAvatar = () => {
    if (currentUser.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="header__avatar"
        />
      );
    }
    console.log(currentUser.avatar);
    const initial = user.name ? user.name.charAt(0).toUpperCase() : "?";
    return <div className="header__avatar-placeholder">{initial}</div>;
  };

  // console.log({ user });

  return (
    <header className="header">
      <div className="header__logo-location">
        <Link
          to="/"
          className="header__link">
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
          {currentUser ? (
            <>
              <button
                onClick={onAddGarment}
                type="button"
                className="header__button">
                <span className="header__button-text">+ Add clothes</span>
              </button>
              <Link
                to="/profile"
                className="header__link">
                <div className="header__profile">
                  <p className="header__username">{currentUser.name}</p>
                  {renderAvatar()}
                </div>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={onSignUp}
                type="button"
                className="header__button">
                <span className="header__button-text">Sign Up</span>
              </button>
              <button
                onClick={onLogIn}
                type="button"
                className="header__button">
                <span className="header__button-text">Log In</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
