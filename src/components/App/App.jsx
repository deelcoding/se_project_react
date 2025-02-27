import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { api } from "../../utils/api";
import { checkAuth } from "../../utils/auth.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModel/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function App() {
  /**************************************************************************
   *                              TEMPERATURE                               *
   **************************************************************************/
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  /**************************************************************************
   *                               USER STATE                               *
   **************************************************************************/

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**************************************************************************
   *                             CLOTHING ITEMS                             *
   **************************************************************************/

  const [clothingItems, setClothingItems] = useState([]);

  /**************************************************************************
   *                                 CARDS                                  *
   **************************************************************************/
  const [selectedCard, setSelectedCard] = useState({});

  /**************************************************************************
   *                                 MODAL                                  *
   **************************************************************************/
  const [activeModal, setActiveModal] = useState("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddGarment = () => {
    setActiveModal("add-garment");
  };

  const onSignUp = () => {
    setActiveModal("sign-up");
  };

  const onLogIn = () => {
    setActiveModal("log-in");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  /**************************************************************************
   *                               USE EFFECT                               *
   **************************************************************************/

  // Check for token validity when the component mounts
  const [user, setUser] = useState(null); // State for storing user data
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("jwt");

    if (token) {
      // If token exists, check its validity with the server
      checkAuth(token)
        .then((userData) => {
          if (userData) {
            setUser(userData); // Set user data if token is valid
          } else {
            // If token is invalid, remove it from localStorage
            localStorage.removeItem("jwt");
          }
        })
        .finally(() => setLoading(false)); // Finish loading state
    } else {
      setLoading(false); // If no token, finish loading
    }
  }, []); // Run only once when the component mounts

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  /**************************************************************************
   *                                  API                                   *
   **************************************************************************/

  const handleAddItemSubmit = (item) => {
    api
      .addItems(item)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = (card) => {
    api
      .deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((c) => c._id !== card._id));
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleRegisterSubmit = (userData) => {
    api
      .register(userData)
      .then((res) => {
        if (res) {
          return api.login({
            email: userData.email,
            password: userData.password,
          });
        }
      })
      .then((user) => {
        if (user) {
          // Set user state if needed
          handleCloseModal();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLoginSubmit = ({ email, password }) => {
    // Send POST request to the server with email and password
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        }
        // If the response is not ok, throw an error
        throw new Error("Login failed");
      })
      .then((res) => {
        // Check if the response contains a token
        if (res.token) {
          // Store the JWT token in localStorage
          localStorage.setItem("jwt", res.token);
          console.log("Login successful, token stored in localStorage");

          // Optionally, handle redirect or state update after login
          // For example, redirecting to the home page:
          // window.location.href = "/";
        } else {
          console.log("No token received in response");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error.message || error);
      });
  };

  const handleSignUp = () => {
    setActiveModal("sign-up");
  };

  const handleLogIn = () => {
    setActiveModal("log-in");
  };

  // Render loading or profile if user is authenticated
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
          <div className="page__content">
            <Header
              onAddGarment={onAddGarment}
              weatherData={weatherData}
              onSignUp={onSignUp}
              onLogIn={onLogIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onAddGarment={onAddGarment}
                    user={user}
                  />
                }
              />
            </Routes>

            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "add-garment"}
              onSubmit={handleAddItemSubmit}
            />
          )}
          {activeModal === "sign-up" && (
            <RegisterModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "sign-up"}
              onSubmit={handleRegisterSubmit}
              onLogin={handleLogIn}
            />
          )}
          {activeModal === "log-in" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "log-in"}
              onSubmit={handleLoginSubmit}
              onSignUp={handleSignUp}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={handleCloseModal}
              isOpen={activeModal === "preview"}
              handleDeleteItem={handleDeleteItem}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
