import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  
  const handleCardClick = () => {
    onCardClick(item);
  };
  
  const isLiked =
  Array.isArray(item.likes) &&
  item.likes.some((id) => id.toString() === currentUser?._id);

  
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;
  
  console.log("rendering itemcard for", item.name);
  console.log("item likes:", item.likes);
  console.log("is liked", isLiked);
  const handleLike = () => {
    onCardLike({
      id: item._id,
      isLiked: isLiked,
    });
  };

  return (
    <li className="card">
      <div className="card__title_like">
        <h2 className="card__name">{item.name}</h2>

        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
            aria-label="Like button"
          />
        )}
      </div>

      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
