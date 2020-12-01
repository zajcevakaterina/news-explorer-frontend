import React from "react";
import "./NothingFound.css";

function NothingFound() {
  return (
    <div className="nothing-found">
      <div className="nothing-found__image"></div>
      <p className="nothing-found__title">Ничего не найдено</p>
      <p className="nothing-found__subtitle">
        К сожалению по вашему запросу ничего не найдено.
      </p>
    </div>
  );
}

export default NothingFound;
