import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

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
// import RegisterModal from "../RegisterModel/RegisterModal.jsx";
// import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../Profile/EditProfileModal.jsx";

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
          <div className="page__content">
            <Header
              onAddGarment={onAddGarment}
              weatherData={weatherData}
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
                    onEditProfile={onEditProfile}
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
              // onSubmit={handleLoginSubmit}
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
