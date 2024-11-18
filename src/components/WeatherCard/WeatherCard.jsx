import "./WeatherCard.css"
import Sunny from "../../images/Group_120.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img
        src={Sunny}
        alt="Sunny"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
