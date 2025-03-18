import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";

import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { api } from "../../utils/api";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModel/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../Profile/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { checkAuth } from "../../utils/auth.js";

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
   *                             CLOTHING ITEMS                             *
   **************************************************************************/

  const [clothingItems, setClothingItems] = useState([]);

  /**************************************************************************
   *                                 CARDS                                  *
   **************************************************************************/
  const [selectedCard, setSelectedCard] = useState({});

  /**************************************************************************
   *                               USER STATE                               *
   **************************************************************************/

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const onEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSignUp = () => {
    setActiveModal("sign-up");
  };

  const handleLogIn = () => {
    setActiveModal("log-in");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  /**************************************************************************
   *                               USE EFFECT                               *
   **************************************************************************/

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

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkAuth(token)
        .then((userData) => {
          if (userData) {
            setCurrentUser(userData);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("jwt");
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  /**************************************************************************
   *                                  API                                   *
   **************************************************************************/

  const handleAddItemSubmit = (item) => {
    api
      .addItems(item)
      .then((item) => {
        setClothingItems([item.data, ...clothingItems]);
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
    setIsLoading(true);

    return api
      .register(userData)
      .then(() => {
        return api.login({
          email: userData.email,
          password: userData.password,
        });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUser(data.user); // optional, if you want to store user data in state
        setIsLoggedIn(true); // optional, depends on your app logic
      })
      .catch((error) => {
        console.error("Registration or login failed:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginSubmit = (userData) => {
    return api
      .login(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkAuth(res.token); // verify and get user info!
        } else {
          throw new Error("Login failed: No token received");
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => console.error("Login Error:", err))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);

    api
      .updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser({
          ...currentUser, // spread the old profile data (with your `_id`) into a new object
          ...updatedUser, // spread the new updated data
        });
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Profile update error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    // <CurrentUserContext.Provider value={{ user: currentUser }}>
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        onAddGarment={onAddGarment}
                        onEditProfile={onEditProfile}
                        onCardLike={handleCardLike}
                        setIsLoggedIn={setIsLoggedIn}
                        handleLogout={handleLogout}
                      />
                    }
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
              isLoading={isLoading}
            />
          )}
          {activeModal === "log-in" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "log-in"}
              onSubmit={handleLoginSubmit}
              onSignUp={handleSignUp}
              isLoading={isLoading}
            />
          )}
          {activeModal === "edit-profile" && (
            <EditProfileModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "edit-profile"}
              onSubmit={handleEditProfileSubmit}
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
