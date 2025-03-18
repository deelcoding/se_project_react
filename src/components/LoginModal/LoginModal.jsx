import { useNavigate } from "react-router-dom";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../utils/useFormAndValidation";

const LoginModal = ({ handleCloseModal, onSubmit, isOpen, onSignUp }) => {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();
  const navigate = useNavigate(); // Call useNavigate without arguments

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure onSubmit returns a Promise (e.g., after a successful API call)
    onSubmit(values)
      .then(() => {
        handleCloseModal(); // Close the modal after successful submission
        resetForm(); // Reset the form state after submission (even if the submission is unsuccessful)
        navigate("/profile"); // Redirect to the profile page after successful login/sign-up
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Optionally, handle error here (e.g., show an error message)
      });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
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
          name="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
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
          onClick={onSignUp}>
          <span className="modal__register-button-text">or Sign Up</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
