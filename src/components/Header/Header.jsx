import headerLogo from "../../images/headerLogo.png";
import userAvatar from "../../images/user_avatar.png";
import "./Header.css";


function Header({onAddGarment, weatherData}) {

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="App Logo"
        className="header__logo"
      />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button onClick={onAddGarment} type="button" className="header__button">
        <span className="header__button-text">+ Add clothes</span>
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img
          src={userAvatar}
          alt="Avatar"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;