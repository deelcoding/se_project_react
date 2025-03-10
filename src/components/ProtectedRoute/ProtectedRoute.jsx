import { Navigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ element }) => {
  const currentUser = useContext(CurrentUserContext);

  return currentUser ? (
    element
  ) : (
    <Navigate
      to="/"
      replace
    />
  );
};

export default ProtectedRoute;
