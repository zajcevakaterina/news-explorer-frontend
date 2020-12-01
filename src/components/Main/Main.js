import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({isAuth}) {
  return (
    <main className="main">
      <SearchForm />
      <NewsCardList isAuth={isAuth}/>
      <About />
    </main>
  );
}

export default Main;
