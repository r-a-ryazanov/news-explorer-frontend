import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import "../PopupWithForm/PopupWithForm.css";
//---------------Компонент возвращает разметку всплывающего окна регистрации------------------------------
function SignUpPopup({
  isOpen,
  handleCloseButton,
  handlesubscriptButton,
  onSignUp,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  //---------------Функция-обработчик клика на кнопку "Зарегистрироваться"------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    onSignUp({ email, password, userName });
  }
  //---------------Функция-обработчик ввода email------------------------------
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  //---------------Функция-обработчик ввода пароля------------------------------
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  //---------------Функция-обработчик ввода имени------------------------------
  function handleChangeUserName(e) {
    setUserName(e.target.value);
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      name="signup"
      onSubmit={handleSubmit}
      handleCloseButton={handleCloseButton}
      title="Регистрация"
    >
      <p className="popup__label">Email</p>
      <input
        type="email"
        id="email-input"
        name="email"
        required
        placeholder="Введите почту"
        minLength="4"
        className="popup__input"
        value={email}
        onChange={handleChangeEmail}
      />
      <span className="popup__input-error" id="email-input-error"></span>
      <p className="popup__label">Пароль</p>
      <input
        type="password"
        id="password-input"
        name="password"
        required
        placeholder="Введите пароль"
        className="popup__input"
        value={password}
        onChange={handleChangePassword}
      />
      <span className="popup__input-error" id="password-input-error"></span>
      <p className="popup__label">Имя</p>
      <input
        type="text"
        id="name-input"
        name="name"
        required
        placeholder="Введите имя"
        className="popup__input"
        value={userName}
        onChange={handleChangeUserName}
      />
      <span className="popup__input-error" id="name-input-error"></span>
      <span className="popup__error" id="input-error"></span>
      <button type="submit" className="popup__apply-button">
        Зарегистрироваться
      </button>
      <p className="popup__subscript">
        или{" "}
        <button
          type="button"
          className="popup__subscript-button"
          onClick={handlesubscriptButton}
        >
          Войти
        </button>
      </p>
    </PopupWithForm>
  );
}
export default SignUpPopup;
