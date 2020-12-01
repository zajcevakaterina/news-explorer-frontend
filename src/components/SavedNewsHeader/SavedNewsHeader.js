import React from "react";
import "./SavedNewsHeader.css";

function SavedNewsHeader({ name, quantity }) {
  return (
    <section className="saved-news-header app__section">
      <p className="saved-news-header__about">Сохраненные статьи</p>
      <h1 className="saved-news-header__title">
        {name}, у вас {quantity} сохраненных статей
      </h1>
      <p className="saved-news-header__keywords">
        По ключевым словам:{" "}
        <span className="saved-news-header__keywords saved-news-header__keywords_strong">
          Природа, Тайга
        </span>{" "}
        и{" "}
        <span className="saved-news-header__keywords saved-news-header__keywords_strong">
          2-м другим
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
