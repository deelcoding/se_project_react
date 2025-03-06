import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  handleCloseModal,
  onSubmit,
  isOpen,
  onSignUp,
  setActiveModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      altButtonText="or Register"
      altButtonClick={() => setActiveModal("sign-up")}
      onClose={handleCloseModal}
      isOpen={isOpen}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div className="modal__button-container">
        <button
          type="submit"
          className="modal__submit">
          Log In
        </button>
        <button
          className="modal__to-register"
          type="button"
          // onClick={handleRegister}
        >
          <span className="modal__register-button-text">or Sign Up</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
