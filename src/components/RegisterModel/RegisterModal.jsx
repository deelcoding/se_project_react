import React, { useState } from "react";
import "./RegisterModal.css";
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
      <label
        htmlFor="name"
        className="modal__label">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          id="imageUrl"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
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
          // onClick={handleRegister}
        >
          <span className="modal__login-button-text">or Log In</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
