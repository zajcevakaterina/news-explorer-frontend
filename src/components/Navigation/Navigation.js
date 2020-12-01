import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
function Navigation({
  isAuth,
  isMobileMenuOpened,
  onAuthClick,
  isSavedNewsPage,
}) {
  
  return (
    <nav className={"nav " + (isMobileMenuOpened ? "nav_mob" : "")}>
      <ul className="nav__list">
        <li className="nav__list-item">
          <NavLink
            activeClassName={
              isSavedNewsPage ? "nav__link_dark-active" : "nav__link_active"
            }
            className={"nav__link " + (isSavedNewsPage ? "nav__link_dark" : "")}
            exact
            to="/"
          >
            Главная
          </NavLink>
        </li>
        {isAuth && (
          <li className="nav__list-item">
            <NavLink
              activeClassName={
                isSavedNewsPage ? "nav__link_dark-active" : "nav__link_active"
              }
              className={
                "nav__link " + (isSavedNewsPage ? "nav__link_dark" : "")
              }
              to="/saved-news"
            >
              Сохраненные статьи
            </NavLink>
          </li>
        )}
      </ul>
      {isAuth ? (
        <button className={"nav__logout-btn " + (isSavedNewsPage ? "nav__logout-btn_dark" : '')}>
          Грета
          <div className={"nav__logout-icon " + (isSavedNewsPage ? "nav__logout-icon_dark" : '')}></div>
        </button>
      ) : (
        <button className="nav__auth-btn" onClick={onAuthClick}>
          Авторизоваться
        </button>
        // эту кнопку не стилизую под светлый хэдер, так как на странице с сохраненными новостями ее не будет
        // после привязки защиты роута
      )}
    </nav>
  );
}

export default Navigation;
