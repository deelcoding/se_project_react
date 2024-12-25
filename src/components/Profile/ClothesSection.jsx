import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({onClick, onCardClick}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__heading">
        <p className="clothes-section__label">Your items</p>
        <button
          // onClick={onAddGarment}
          type="button"
          className="clothes-section__add">
          <span className="clothes-section__button-text">+ Add new</span>
        </button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                // TO-DO - Pass below as a prop
                // onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
