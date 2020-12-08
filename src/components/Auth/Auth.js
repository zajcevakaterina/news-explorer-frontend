import React, {useState} from "react";
import "./Auth.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Auth({
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
  authErrorText
}) {

  const handleSubmitAuth = (e) => {
    e.preventDefault();
    onSubmit(values.email, values.password);
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmitAuth}
      onClose={onClose}
      isOpen={isOpen}
      title={title}
      submitBtnText={submitBtnText}
      altBtnText={altBtnText}
      altAction={altAction}
      isValid={isValid}
      errorText={authErrorText}
    >
      <label className="popup-form__label">Email</label>
      <input
        type="email"
        required
        placeholder="Введите почту"
        id="email"
        name="email"
        className="popup-form__input"
        value={values.email || ''}
        onChange={handleChange}
      />
      <span className="popup-form__error" id="email-error">{errors.email || ""}</span>

      <label className="popup-form__label">Пароль</label>
      <input
        type="password"
        minLength="6"
        required
        placeholder="Введите пароль"
        id="password"
        name="password"
        value={values.password || ''}
        onChange={handleChange}
        className="popup-form__input"
      />
      <span className="popup-form__error" id="password-error">{errors.password || ""}</span>
    </PopupWithForm>
  );
}

export default Auth;
