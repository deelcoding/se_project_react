import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ handleCloseModal, onSubmit, isOpen }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save Changes"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
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
        Avatar *{" "}
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
      <button
        type="submit"
        className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
