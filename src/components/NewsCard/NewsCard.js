import React from "react";
import "./NewsCard.css";
import { ARTICLE_DEFAULT_IMAGE } from "../../utils/constants";

function NewsCard({
  card,
  keyword,
  isAuth,
  isSavedNewsPage,
  saveArticle,
  deleteArticle,
  openReg
}) {

  const handleClick = () => {
    if (isSavedNewsPage) {
      deleteArticle(card._id);
      return;
    }
    if (card._id) {
      deleteArticle(card._id);
      return;
    }
    saveArticle(cardToShow)
  };

  const formCard = () => {
    if (isSavedNewsPage) {
      return {
        title: card.title,
        source: card.source,
        publishedAt: card.date,
        description: card.text,
        urlToImage: card.image || ARTICLE_DEFAULT_IMAGE,
        url: card.link,
        keyword: card.keyword,
      };
    } else {
      return {
        title: card.title,
        source: card.source.name,
        publishedAt: card.publishedAt,
        description: card.description,
        urlToImage: card.urlToImage || ARTICLE_DEFAULT_IMAGE,
        url: card.url,
        keyword: keyword,
      };
    }
  };

  const cardToShow = formCard();

  const formatDate = (date) => {
    const cardDate = new Date(date);

    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const year = cardDate.getFullYear();
    const month = cardDate.getMonth();
    const monthName = months[month];
    const day = cardDate.getDate();

    return `${day} ${monthName}, ${year}`;
  };

  return (
    <div className="news-card">
      {isSavedNewsPage && (
        <p className="news-card__keyword">{cardToShow.keyword}</p>
      )}

      <div className="news-card__action">
        {isAuth ? (
          <button
            className={
              "news-card__btn " +
              (isSavedNewsPage
                ? "news-card__btn_delete"
                : card._id
                ? "news-card__btn_saved"
                : "news-card__btn_save-active")
            }
            onClick={handleClick}
          ></button>
        ) : (
          <button
            className="news-card__btn news-card__btn_save-not-active"
            onClick={openReg}
          ></button>
        )}
      </div>

      <img
        className="news-card__image"
        src={cardToShow.urlToImage}
        alt={cardToShow.title}
      />
      <a
        href={cardToShow.url}
        target="_blank"
        rel="noreferrer"
        className="news-card__info"
      >
        <div className="news-card__top">
          <p className="news-card__date">
            {formatDate(cardToShow.publishedAt)}
          </p>
          <h3 className="news-card__title">{cardToShow.title}</h3>
          <p className="news-card__description">{cardToShow.description}</p>
        </div>

        <p className="news-card__source">{cardToShow.source}</p>
      </a>
    </div>
  );
}

export default NewsCard;
