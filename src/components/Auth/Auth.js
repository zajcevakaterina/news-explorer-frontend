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
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitAuth = (e) => {
    e.preventDefault();
    // onAuth(
    //   email,
    //   password);
    onClose();
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
    >
      <label className="popup-form__label">Email</label>
      <input
        type="email"
        required
        placeholder="Введите почту"
        id="email"
        name="email"
        className="popup-form__input"
        value={email}
        onChange={handleChangeEmail}
      />
      <span className="popup-form__error" id="email-error"></span>

      <label className="popup-form__label">Пароль</label>
      <input
        type="password"
        minLength="6"
        required
        placeholder="Введите пароль"
        id="password"
        name="password"
        value={password}
        onChange={handleChangePassword}
        className="popup-form__input"
      />
      <span className="popup-form__error" id="password-error"></span>
    </PopupWithForm>
  );
}

export default Auth;
