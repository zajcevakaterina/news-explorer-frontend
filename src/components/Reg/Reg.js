import React, { useState } from "react";
import "./Reg.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Reg({
  onClose,
  isOpen,
  title,
  submitBtnText,
  altBtnText,
  altAction,
  errors,
  handleChange,
  isValid,
  values,
  onSubmit,
  regErrorText
}) {
  const handleSubmitReg = (e) => {
    e.preventDefault();
    onSubmit(values.email, values.password, values.name);
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmitReg}
      onClose={onClose}
      isOpen={isOpen}
      title={title}
      submitBtnText={submitBtnText}
      altBtnText={altBtnText}
      altAction={altAction}
      isValid={isValid}
      errorText={regErrorText}
    >
      <label className="popup-form__label">Email</label>
      <input
        type="email"
        required
        placeholder="Введите почту"
        id="reg-email"
        name="email"
        className="popup-form__input"
        value={values.email || ""}
        onChange={handleChange}
      />
      <span className="popup-form__error" id="reg-email-error">
        {errors.email || ""}
      </span>

      <label className="popup-form__label">Пароль</label>
      <input
        type="password"
        minLength="6"
        required
        placeholder="Введите пароль"
        id="reg-password"
        name="password"
        value={values.password || ""}
        onChange={handleChange}
        className="popup-form__input"
      />
      <span className="popup-form__error" id="reg-password-error">
        {errors.password || ""}
      </span>

      <label className="popup-form__label">Имя</label>
      <input
        type="text"
        minLength="2"
        required
        placeholder="Введите своё имя"
        id="name"
        name="name"
        value={values.name || ""}
        onChange={handleChange}
        className="popup-form__input"
      />
      <span className="popup-form__error" id="name-error">
        {errors.name || ""}
      </span>
    </PopupWithForm>
  );
}

export default Reg;
