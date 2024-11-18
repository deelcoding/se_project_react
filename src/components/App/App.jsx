import { useState } from "react";
// import reactLogo from "../images/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Header from "../Header/Header.jsx";
// import Main from "../Main/Main.jsx";
// import Footer from "../Footer/Footer.jsx";
// import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
// import ItemModal from "../ItemModal/ItemModal.jsx";
// import ItemCard from "../ItemCard/ItemCard.jsx"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        {/* <Main /> */}
        {/* <Footer /> */}
        {/* <ModalWithForm /> */}
        {/* <ItemModal /> */}
      </div>
    </div>
  );
}

export default App;
