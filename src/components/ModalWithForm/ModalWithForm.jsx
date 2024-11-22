import { useEffect } from "react";
import { Children } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
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
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"></button>
        <form
          action=""
          className="modal__form">
          {children}
          <button
            type="submit"
            className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
