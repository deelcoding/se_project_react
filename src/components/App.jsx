import { useState } from "react";
import reactLogo from "../images/react.svg";
import viteLogo from "/vite.svg";
import "../blocks/App.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ModalWithForm from "./ModalWithForm.jsx";
import ItemModal from "./ItemModal.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Main />
      <Footer />
      <ModalWithForm />
      <ItemModal />
    </>
  );
}

export default App;
