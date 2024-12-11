import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: "",
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // useEffect(() => {
  //   api
  //     .getItemList()
  //     .then((items) => {
  //       setClothingItems(items);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddGarment = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const onAddItem = (e) => {
    e.preventDefault();
  };

  // const handleAddItemSubmit = (item) => {
  //   api
  //     .addItem(item)
  //     .then((newItem) => {
  //       setClothingItems([newItem, ...clothingItems]);
  //       closeAllModals();
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleCardDelete = (card) => {
  //   api
  //     .removeItem(card.id)
  //     .then(() => {
  //       setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="page__content">
          <Header
            onAddGarment={onAddGarment}
            weatherData={weatherData}
          />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
          />
          <Footer />
        </div>
        {/* {activeModal === "add-garment" && (
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
          />
        )} */}
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "preview"}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
