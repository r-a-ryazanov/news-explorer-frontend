import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import "../PopupWithForm/PopupWithForm.css";
import { formValidator } from "../../utils/formValidator.js";
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
  const [emailValidationMessage, setEmailValidationMessage] = React.useState(
    ""
  );
  const [
    passwordValidationMessage,
    setPasswordValidationMessage,
  ] = React.useState("");
  const [nameValidationMessage, setNameValidationMessage] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  function closePopup(){
    setEmail("");
    setPassword("");
    setUserName("");
    setEmailValidationMessage("");
    setPasswordValidationMessage("");
    setNameValidationMessage("");
    setIsButtonDisabled(true);
    handleCloseButton();
  }
  //---------------Функция-обработчик клика на кнопку "Зарегистрироваться"------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    onSignUp({ email, password, userName });
  }
  //---------------Функция-обработчик ввода email------------------------------
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    formValidator(
      document.querySelector(".popup__container"),
      document.getElementById("email-input"),
      setEmailValidationMessage,
      setIsButtonDisabled
    );
  }
  //---------------Функция-обработчик ввода пароля------------------------------
  function handleChangePassword(e) {
    setPassword(e.target.value);
    formValidator(
      document.querySelector(".popup__container"),
      document.getElementById("password-input"),
      setPasswordValidationMessage,
      setIsButtonDisabled
    );
  }
  //---------------Функция-обработчик ввода имени------------------------------
  function handleChangeUserName(e) {
    setUserName(e.target.value);
    formValidator(
      document.querySelector(".popup__container"),
      document.getElementById("name-input"),
      setNameValidationMessage,
      setIsButtonDisabled
    );
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      name="signup"
      onSubmit={handleSubmit}
      handleCloseButton={closePopup}
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
      <span
        className={`popup__input-error ${
          emailValidationMessage !== "" && "popup__input-error_visible"
        }`}
        id="email-input-error"
      >
        {emailValidationMessage}
      </span>
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
      <span className={`popup__input-error ${
          passwordValidationMessage !== "" && "popup__input-error_visible"
      }`} id="password-input-error">{passwordValidationMessage}</span>
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
      <span className={`popup__input-error ${
          nameValidationMessage !== "" && "popup__input-error_visible"
      }`} id="name-input-error">{nameValidationMessage}</span>
      <span className="popup__error" id="input-error"></span>
      <button type="submit" className={`popup__apply-button ${isButtonDisabled&&"popup__apply-button_disabled"}`} disabled={isButtonDisabled}>
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
