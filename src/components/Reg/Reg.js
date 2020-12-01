import React, {useState} from "react";
import "./Reg.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Reg({
  onClose,
  isOpen,
  title,
  submitBtnText,
  altBtnText,
  altAction,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmitReg = (e) => {
    e.preventDefault();
    // onReg(
    //   email,
    //   password, 
    //   name);
    onClose();
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
    >
      <label className="popup-form__label">Email</label>
      <input
        type="email"
        required
        placeholder="Введите почту"
        id="reg-email"
        name="email"
        className="popup-form__input"
        value={email}
        onChange={handleChangeEmail}
      />
      <span className="popup-form__error" id="reg-email-error"></span>

      <label className="popup-form__label">Пароль</label>
      <input
        type="password"
        minLength="6"
        required
        placeholder="Введите пароль"
        id="reg-password"
        name="password"
        value={password}
        onChange={handleChangePassword}
        className="popup-form__input"
      />
      <span className="popup-form__error" id="reg-password-error"></span>

      <label className="popup-form__label">Имя</label>
      <input
        type="text"
        minLength="2"
        required
        placeholder="Введите своё имя"
        id="name"
        name="name"
        value={name}
        onChange={handleChangeName}
        className="popup-form__input"
      />
      <span className="popup-form__error" id="name-error"></span>
    </PopupWithForm>
  );
}

export default Reg;
