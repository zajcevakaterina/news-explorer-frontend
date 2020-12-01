import React from "react";
import "./SuccessPopup.css";
import Popup from "../Popup/Popup";

function SuccessPopup({onClose, isOpen, onAction}) {
  return (
    <Popup onClose={onClose} isOpen={isOpen}>
      <h3 className="popup-form__title">
        Пользователь успешно зарегистрирован!
      </h3>

      <button className="popup-form__alt-action popup-form__alt-action_big" onClick={onAction}>Войти</button>
    </Popup>
  );
}

export default SuccessPopup;
