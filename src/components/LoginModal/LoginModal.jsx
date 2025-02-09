import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ handleCloseModal, onSubmit, isOpen, onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Login"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div className="modal__footer">
        <span
          className="modal__link"
          onClick={onSignUp}>
          or Sign Up
        </span>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
