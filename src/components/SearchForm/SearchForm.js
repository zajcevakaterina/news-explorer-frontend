import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch}) {
  const [keyword, setKeyword] = useState(localStorage.getItem('keyword') || '');
  const [showInputError, setShowInputError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword === "") {
      setShowInputError(true);
    } else {
      setShowInputError(false);
      onSearch(keyword);
    }
  };

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
          <form className="search__form" onSubmit={onSubmit}>
            <input
              className="search__input"
              type="text"
              placeholder="Введите тему новости"
              required
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
            <span
              className={`search__input-error ${
                showInputError ? "search__input-error_active" : ""
              }`}
            >
              Введите ключевое слово
            </span>
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
