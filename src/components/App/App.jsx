import { useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
// import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
// import ItemModal from "../ItemModal/ItemModal.jsx";
// import ItemCard from "../ItemCard/ItemCard.jsx"
// import Footer from "../Footer/Footer.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [weatherData, setWeatherData] = useState({ type: "cold" });

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData}/>
        {/* <Footer /> */}
        {/* <ModalWithForm /> */}
        {/* <ItemModal /> */}
      </div>
    </div>
  );
}

export default App;
