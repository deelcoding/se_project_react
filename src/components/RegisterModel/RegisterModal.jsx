import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ handleCloseModal, onSubmit, isOpen, onLogin }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <label className="modal__label">
        Email*
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
        Password*
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL *
        <input
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
						<div className="modal__footer">
        <span
          className="modal__link"
          onClick={onLogin}>
          or Log In
        </span>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
