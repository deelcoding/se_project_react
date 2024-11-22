import "./WeatherCard.css"
import Sunny from "../../images/Group_120.png";

function WeatherCard({weatherData}) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={Sunny}
        alt="Sunny"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
