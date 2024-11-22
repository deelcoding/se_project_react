import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
  // Effect to handle ESC key press and outside click
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose(); // Close the modal if ESC key is pressed
      }
    };

    const handleOutsideClick = (event) => {
      const modalContent = document.querySelector(".modal__content");
      if (modalContent && !modalContent.contains(event.target)) {
        onClose(); // Close the modal if clicking outside modal content
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleEscKey);
    window.addEventListener("click", handleOutsideClick);

    // Cleanup event listeners on component unmount or when modal closes
    return () => {
      window.removeEventListener("keydown", handleEscKey);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"></button>
        <img
          src={card.link}
          alt=""
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
