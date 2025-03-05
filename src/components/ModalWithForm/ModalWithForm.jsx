import { Children } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        />
        <form
          action=""
          className="modal__form"
          onSubmit={onSubmit}>
          {children}
          <section className="test">
            <button
              type="submit"
              className="modal__submit">
              {buttonText}
            </button>
            <p>or Sign Up</p>
          </section>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
