import React, { useState } from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({
  isAuth,
  keyword,
  searchResult,
  searchIsLoading,
  notFound,
  notFoundType,
  onNewsSearch,
  saveArticle,
  deleteArticle,
  openReg
}) {
  const showNewsCardList = () => {
    return searchIsLoading || notFound || searchResult.length > 0;
  };

  return (
    <main className="main">
      <SearchForm onSearch={onNewsSearch} />
      {showNewsCardList() && (
        <NewsCardList
          keyword={keyword}
          isAuth={isAuth}
          isLoading={searchIsLoading}
          notFound={notFound}
          articles={searchResult}
          notFoundType={notFoundType}
          saveArticle={saveArticle}
          deleteArticle={deleteArticle}
          openReg={openReg}
        />
      )}
      <About />
    </main>
  );
}

export default Main;
