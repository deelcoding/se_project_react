import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ onClose, card, isOpen, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        />
        <img
          src={card.imageUrl}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__item-description">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              onClick={() => handleDeleteItem(card)}
              className="modal__delete-button">
              <span className="modal__button-text">Delete item</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
