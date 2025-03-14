import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../utils/useFormAndValidation";

const RegisterModal = ({
  handleCloseModal,
  onSubmit,
  isOpen,
  onLogin,
  isLoading,
}) => {
  // Just use the values from the custom hook (no need to re-declare `values` with useState)
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
    resetForm();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Registering..." : "Next"}
      onClose={handleCloseModal}
      isOpen={isOpen}
      formValid={isValid}
      onSubmit={handleSubmit}>
      <label
        htmlFor="email"
        className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={values.email || ""}
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
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label
        htmlFor="name"
        className="modal__label">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label
        htmlFor="avatarURL"
        className="modal__label">
        Avatar URL *{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__button-container">
        <button
          type="submit"
          className="modal__submit">
          Sign Up
        </button>
        <button
          className="modal__to-login"
          type="button"
          onClick={onLogin}>
          <span className="modal__login-button-text">or Log In</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
