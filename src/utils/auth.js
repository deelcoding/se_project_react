const API_URL = "http://localhost:3001";

export const signup = function ({ name, avatar, email, password }) {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((response) => response.json());
};

export const signin = function ({ email, password }) {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => response.json());
};

export const checkAuth = (token) => {
  return fetch("/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach token in the Authorization header
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid token or session expired.");
      }
      return response.json();
    })
    .then((data) => {
      return data; // You can return user data or a success message
    })
    .catch((error) => {
      console.error("Authentication error:", error.message);
      return null; // Return null or handle the error as needed
    });
};
