import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import openIcon from "../../images/header/openIcon.svg";
import closeIcon from "../../images/header/closeIcon.svg";
import openIconDark from "../../images/header/openIconDark.svg";

function Header({ onAuthClick, isAuth }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const onOpenMobileCLick = () => {
    setIsMobileMenuOpened(true);
  };

  const onCloseMobileCLick = () => {
    setIsMobileMenuOpened(false);
  };

  const onAuthHeaderClick = () => {
    if (isMobileMenuOpened) {
      setIsMobileMenuOpened(false);
      onAuthClick();
      return
    }
    onAuthClick();
  };

  return (
    <header
      className={"header " + (isMobileMenuOpened ? "header_menu-opened" : "")}
    >
      <div className="header__content app__section">
        <NavLink
          className={
            "header__logo " +
            (isSavedNewsPage && !isMobileMenuOpened ? "header__logo_dark" : "")
          }
          to="/"
        >
          News Explorer
        </NavLink>
        <Navigation
          isAuth={isAuth}
          onAuthClick={onAuthHeaderClick}
          isMobileMenuOpened={isMobileMenuOpened}
          isSavedNewsPage={isSavedNewsPage}
        />
        {isMobileMenuOpened ? (
          <button
            type="button"
            className="header__mobile-btn"
            onClick={onCloseMobileCLick}
          >
            <img
              className="header__btn-icon"
              src={closeIcon}
              alt="Иконка закрытия мобильного меню - крестик"
            />
          </button>
        ) : (
          <button
            type="button"
            className="header__mobile-btn"
            onClick={onOpenMobileCLick}
          >
            <img
              className="header__btn-icon"
              alt="Иконка открытия мобильного меню - 2 горизонтальные линии"
              src={isSavedNewsPage ? openIconDark : openIcon}
            />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
