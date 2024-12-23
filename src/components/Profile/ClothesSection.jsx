import "./ClothesSection.css";
import avatar from "../../images/user_avatar.png";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section__heading">
        <p className="clothes-section__label">Your Items</p>
        <button className="clothes-section__add">+ Add New</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
