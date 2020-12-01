import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__background"></div>
      <div className="search__content app__section">
        <div className="search__wrapper">
          <h1 className="search__title">Что творится в мире?</h1>
          <p className="search__subtitle">
            Находите самые свежие статьи на любую тему и сохраняйте в своём
            личном кабинете.
          </p>
          <form className="search__form">
            <input
              className="search__input"
              type="text"
              placeholder="Введите тему новости"
            ></input>
            <button type="submit" className="search__submit-btn">
              Искать
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
