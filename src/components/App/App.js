import React, { useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import Auth from "../Auth/Auth";
import Reg from "../Reg/Reg";
import SuccessPopup from "../SuccessPopup/SuccessPopup";

function App() {
  const [isAuth, setIsAuth] = useState(false); // здесь можно сменить состояние авторизации для теста

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  React.useEffect(() => {
    function closeOnEscClick(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeOnOverlayClick(e) {
      if (e.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }

    document.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("keydown", closeOnEscClick);

    return () => {
      document.removeEventListener("keydown", closeOnOverlayClick);
      document.removeEventListener("click", closeOnEscClick);
    };
  });

  const closeAllPopups = () => {
    setShowAuthModal(false);
    setShowRegModal(false);
    setShowSuccessModal(false);
  };

  const openAuth = () => {
    closeAllPopups();
    setShowAuthModal(true);
  };
  const openReg = () => {
    closeAllPopups();
    setShowRegModal(true);
  };

  const openSuccessModal = () => {
    closeAllPopups();
    setShowSuccessModal(true);
  };

  return (
    <div className="app">
      <Header onAuthClick={openAuth} isAuth={isAuth} />

      <Switch>
        <Route path="/saved-news">
          <SavedNews />
        </Route>

        <Route path="/">
          <Main isAuth={isAuth} />
        </Route>
      </Switch>

      <Footer />

      <section className="popups">
        <Auth
          isOpen={showAuthModal}
          onClose={closeAllPopups}
          title="Вход"
          submitBtnText="Войти"
          altBtnText="Зарегистрироваться"
          altAction={openReg}
        />

        <Reg
          isOpen={showRegModal}
          onClose={closeAllPopups}
          title="Регистрация"
          submitBtnText="Зарегистрироваться"
          altBtnText="Войти"
          altAction={openAuth}
        />

        <SuccessPopup
          isOpen={showSuccessModal}
          onClose={closeAllPopups}
          onAction={openAuth}
        />
      </section>
    </div>
  );
}

export default withRouter(App);
