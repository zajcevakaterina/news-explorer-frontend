import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";

function NewsCardList({ isAuth, isLoading, notFound, articles, keyword, notFoundType, saveArticle, deleteArticle, openReg }) {
  const [indexOfLastCardShown, setIndexOfLastCardShown] = useState(2);

  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const cardsToShow = () => {
    if (isSavedNewsPage) {
      return articles;
    } else {
      return articles.slice(0, indexOfLastCardShown + 1);
    }
  };
  const showMoreButton = indexOfLastCardShown < articles.length;

  const showNewCards = () => {
    setIndexOfLastCardShown(indexOfLastCardShown + 3);
  };

  const Result = () => {
    if (isLoading) {
      return <Preloader />;
    } else if (notFound) {
      return <NothingFound type={notFoundType} />;
    } else {
      return (
        <>
          {!isSavedNewsPage && (
            <h2 className="news-list__title">Результаты поиска</h2>
          )}
          <ul className="news-list__list">
            {articles &&
              cardsToShow().map((card, index) => {
                return (
                  <li className="news-list__list-item" key={'' + card.url + index}>
                    <NewsCard
                      card={card}
                      keyword={keyword}
                      isSavedNewsPage={isSavedNewsPage}
                      isAuth={isAuth}
                      saveArticle={saveArticle}
                      deleteArticle={deleteArticle}
                      openReg={openReg}
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
