import React from "react";
import "./PopupWithForm.css";
import Popup from "../Popup/Popup";

function PopupWithForm({
  title,
  submitBtnText,
  altBtnText,
  children,
  isOpen,
  onClose,
  altAction,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__form">
        <h3 className="popup-form__title">{title}</h3>
        <form className="popup-form__form">
          {children}
          <div className="popup-form__submit">
            <span className="popup-form__error popup-form__error_server">
            </span>
            <button className="popup-form__submit-btn">{submitBtnText}</button>
          </div>
        </form>

        <div className="popup-form__alternative">
          <span className="popup-form__alt-text">или</span>
          <button className="popup-form__alt-action" onClick={altAction}>
            {altBtnText}
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
