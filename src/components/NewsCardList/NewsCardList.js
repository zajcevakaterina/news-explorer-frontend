import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { cardData } from "../../utils/cardData";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";

function NewsCardList({ isAuth }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [indexOfLastCardShown, setIndexOfLastCardShown] = useState(2);

  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const cardsToShow = () => {
    if (isSavedNewsPage) {
      return cardData;
    } else {
      return cardData.slice(0, indexOfLastCardShown + 1);
    }
  };
  const showMoreButton = indexOfLastCardShown < cardData.length;

  const showNewCards = () => {
    setIndexOfLastCardShown(indexOfLastCardShown + 3);
  };

  const Result = () => {
    if (isLoading) {
      return <Preloader />;
    } else if (showError) {
      return <NothingFound />;
    } else {
      return (
        <>
          {!isSavedNewsPage && (
            <h2 className="news-list__title">Результаты поиска</h2>
          )}
          <ul className="news-list__list">
            {cardData &&
              cardsToShow().map((card) => {
                return (
                  <li className="news-list__list-item" key={card.id}>
                    <NewsCard
                      card={card}
                      isSavedNewsPage={isSavedNewsPage}
                      isAuth={isAuth}
                    />
                  </li>
                );
              })}
          </ul>
          {showMoreButton && !isSavedNewsPage && (
            <button className="news-list__more-btn" onClick={showNewCards}>
              Показать еще
            </button>
          )}
        </>
      );
    }
  };
  return (
    <section className="news-list">
      <div className="news-list__content app__section">
        <Result />
      </div>
    </section>
  );
}

export default NewsCardList;
