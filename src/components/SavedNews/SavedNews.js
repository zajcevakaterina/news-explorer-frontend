import React from "react";
import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList"

function SavedNews({articles, deleteArticle, isAuth}) {
  return (
    <main className="saved-news">
      <SavedNewsHeader articles={articles}/>
      {articles && articles.length > 0 && <NewsCardList articles={articles} deleteArticle={deleteArticle} isAuth={isAuth}/>}
    </main>
  );
}

export default SavedNews;
