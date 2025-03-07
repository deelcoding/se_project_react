import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../utils/useFormAndValidation";

const LoginModal = ({ handleCloseModal, onSubmit, isOpen, onSignUp }) => {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
    resetForm();
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      onClose={handleCloseModal}
      isOpen={isOpen}
      formValid={isValid}>
      <label
        htmlFor="email"
        className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label
        htmlFor="password"
        className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__button-container">
        <button
          type="submit"
          className="modal__submit"
          onSubmit={handleSubmit}>
          Log In
        </button>
        <button
          className="modal__to-register"
          type="button"
          onClick={onSignUp}>
          <span className="modal__register-button-text">or Sign Up</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
