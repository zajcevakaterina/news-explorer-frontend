import React from "react";
import "./NothingFound.css";

function NothingFound({ type }) {
  const textsToShow = () => {
    if (type === "not-found") {
      return {
        title: "Ничего не найдено",
        text: "К сожалению по вашему запросу ничего не найдено.",
      };
    } else {
      return {
        title: "Во время запроса произошла ошибка",
        text:
          "Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.",
      };
    }
  };
  return (
    <div className="nothing-found">
      <div className="nothing-found__image"></div>
      <p className="nothing-found__title">{textsToShow().title}</p>
      <p className="nothing-found__subtitle">{textsToShow().text}</p>
    </div>
  );
}

export default NothingFound;
