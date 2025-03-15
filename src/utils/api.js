const baseUrl = "http://localhost:3001";

const token = localStorage.getItem("jwt");

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => {
      console.error("Error response:", err); // log the error message from the server
      return Promise.reject(
        `Error ${res.status}: ${err.message || "Unknown error"}`
      );
    });
  }
}

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const addItems = ({ name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(checkResponse);
};

const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    // Ensure the endpoint is correct (should be /signin in your case)
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT", // RESTful convention to add a like
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // include token in header for auth
    },
  }).then(checkResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE", // RESTful convention to remove a like
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const updateUserProfile = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // assuming JWT auth
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
};

export const api = {
  getItems,
  addItems,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateUserProfile,
  register,
  login,
};
