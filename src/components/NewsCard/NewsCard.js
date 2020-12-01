import React from "react";
import "./NewsCard.css";

function NewsCard({ card, isAuth, isSavedNewsPage }) {
  const { title, source, publishedAt, description, urlToImage, keyword } = card;

  return (
    <div className="news-card">
      {isSavedNewsPage && (
        <p className="news-card__keyword">{keyword}</p>
      )}

      <div className="news-card__action">
        {isAuth ? (
          <button className={"news-card__btn " + (isSavedNewsPage ? "news-card__btn_delete" : "news-card__btn_save-active")} ></button>
        ) : (
          <button className="news-card__btn news-card__btn_save-not-active" disabled></button>
        )}
      </div>

      <img className="news-card__image" src={urlToImage} alt={title} />
      <div className="news-card__info">
        <div className="news-card__top">
          <p className="news-card__date">{publishedAt}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">{description}</p>
        </div>

        <p className="news-card__source">{source.name}</p>
      </div>
    </div>
  );
}

export default NewsCard;
