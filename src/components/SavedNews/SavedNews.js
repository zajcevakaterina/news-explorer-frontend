import React from "react";
import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList"

function SavedNews() {
  const isAuth = true // константа для теста, пока нет функционала (эта страница будет защищена авторизацией)
  return (
    <main className="saved-news">
      <SavedNewsHeader name="Грета" quantity="5"/>
      <NewsCardList isAuth={isAuth}/>
    </main>
  );
}

export default SavedNews;
