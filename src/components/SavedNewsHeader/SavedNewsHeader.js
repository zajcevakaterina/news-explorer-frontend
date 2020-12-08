import React, { useState } from "react";
import "./SavedNewsHeader.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ articles }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [sortedKeywords, setSortedKeywords] = useState([]);

  const articlesQuantityText = (num) => {
    if (num === 1) {
      return "сохраненная статья";
    }
    if (num > 1 && num < 5) {
      return "сохранённые статьи";
    } else {
      return "сохранённых статей";
    }
  };

  const otherKeywordsQuantityText = (num) => {
    if (num === 1) {
      return "-му другому";
    }
    if (num > 1 && num < 5) {
      return "-м другим";
    } else {
      return "-и другим";
    }
  };

  React.useEffect(() => {
    let keywords = {};
    if(articles) {
    articles.forEach((article) => {
      if (keywords[article.keyword]) {
        keywords[article.keyword] += 1;
      } else {
        keywords[article.keyword] = 1;
      }
    });
    const sortedKeywords = Object.keys(keywords).sort(
      (a, b) => keywords[b] - keywords[a]
    );
    setSortedKeywords(sortedKeywords);
    }
  }, [articles]);

  return (
    <section className="saved-news-header app__section">
      <p className="saved-news-header__about">Сохраненные статьи</p>
      <h1 className="saved-news-header__title">
        {currentUser.name}, у вас {articles.length}{" "}
        {articlesQuantityText(articles.length)}
      </h1>
      <p className="saved-news-header__keywords">
        {sortedKeywords.length === 1 ? (
          <span className="saved-news-header__keywords saved-news-header__keywords_strong">
            По ключевому слову {sortedKeywords[0]}
          </span>
        ) : (
          ""
        )}
        {sortedKeywords.length === 2 ? (
          <span className="saved-news-header__keywords saved-news-header__keywords_strong">
            По ключевым словам: {sortedKeywords[0]}, {sortedKeywords[1]}
          </span>
        ) : (
          ""
        )}
        {sortedKeywords.length === 3 ? (
          <span className="saved-news-header__keywords saved-news-header__keywords_strong">
            По ключевым словам: {sortedKeywords[0]}, {sortedKeywords[1]}, {sortedKeywords[2]}
          </span>
        ) : (
          ""
        )}
        {sortedKeywords.length > 3 ? (
          <span className="saved-news-header__keywords saved-news-header__keywords_strong">
            По ключевым словам: {sortedKeywords[0]}, {sortedKeywords[1]} и{" "}
            <span className="saved-news-header__keywords saved-news-header__keywords_strong">
              {sortedKeywords.length - 2}{otherKeywordsQuantityText(sortedKeywords.length - 2)}
            </span>
          </span>
        ) : (
          ""
        )}
      </p>
    </section>
  );
}

export default SavedNewsHeader;
