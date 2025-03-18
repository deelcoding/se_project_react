import { useState } from "react";

const useFormAndValidation = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: event.target.validationMessage }));
    setIsValid(event.target.closest("form").checkValidity());
  };

  const resetForm = (newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  };

  return { values, handleChange, errors, isValid, resetForm };
};

export default useFormAndValidation;
