import React from "react";
import "./Popup.css";


function Popup({ isOpen, onClose, children }) {
  return (
    <div className={`popup ` + (isOpen ? "popup_opened" : "")}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
