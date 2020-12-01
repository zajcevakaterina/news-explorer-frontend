import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import githubIcon from '../../images/githubIcon.svg'
import fbIcon from '../../images/fbIcon.svg'

function Footer() {
  return (
    <footer className="footer app__section">
      <p className="footer__copyright">
        &copy; 2020 Supersite, Powered by News API
      </p>
      <div className="footer__nav">
        <ul className="footer__list footer__list_content_links">
          <li className="footer__link-item">
            <NavLink to="/" className="footer__link">Главная</NavLink>
          </li>
          <li className="footer__link-item">
            <a href="https://praktikum.yandex.ru" target="_blank" className="footer__link">
              Яндекс Практикум
            </a>
          </li>
        </ul>
        <ul className="footer__list">
          <li className="footer__social-item">
            <a href="https://github.com/zajcevakaterina" target="_blank"  className="footer__social-link">
              <img alt="Профиль на GitHub" src={githubIcon} className="footer__social-icon" />
            </a>
          </li>
          <li className="footer__social-item">
            <a href="https://www.facebook.com/profile.php?id=100011341341301" target="_blank" className="footer__social-link">
              <img alt="Профиль на Facebook" target="_blank" src={fbIcon} className="footer__social-icon"/>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
