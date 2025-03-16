import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onAddGarment, onCardClick, clothingItems, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__heading">
        <p className="clothes-section__label">Your items</p>
        <button
          onClick={onAddGarment}
          type="button"
          className="clothes-section__add">
          <span className="clothes-section__button-text">+ Add new</span>
        </button>
      </div>
      <ul className="clothes-section__items">
        {userClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
