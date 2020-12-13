import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import "../PopupWithForm/PopupWithForm.css";
import { formValidator } from "../../utils/formValidator.js";
//---------------Компонент возвращает разметку всплывающего окна авторизации------------------------------
function SignInPopup({
  isOpen,
  handleCloseButton,
  handlesubscriptButton,
  onSignIn,
  mainApiError,
  isAuthLoading,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailValidationMessage, setEmailValidationMessage] = React.useState(
    ""
  );
  const [
    passwordValidationMessage,
    setPasswordValidationMessage,
  ] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  function closePopup() {
    setEmail("");
    setPassword("");
    setEmailValidationMessage("");
    setPasswordValidationMessage("");
    setIsButtonDisabled(true);
    handleCloseButton();
  }
  //---------------Функция-обработчик клика на кнопку "Войти"------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    onSignIn({ email, password });
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
  return (
    <PopupWithForm
      isOpen={isOpen}
      name="signin"
      onSubmit={handleSubmit}
      handleCloseButton={closePopup}
      title="Вход"
      handlesubscriptButton={handlesubscriptButton}
      subscriptButtonText="Войти"
      subscriptText="или "
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
        disabled={isAuthLoading}
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
        disabled={isAuthLoading}
      />
      <span
        className={`popup__input-error ${
          passwordValidationMessage !== "" && "popup__input-error_visible"
        }`}
        id="password-input-error"
      >
        {passwordValidationMessage}
      </span>
      {mainApiError !== "" && (
        <span className="popup__error" id="input-error">
          {mainApiError}
        </span>
      )}
      <button
        type="submit"
        className={`popup__apply-button ${
          isButtonDisabled && "popup__apply-button_disabled"
        }`}
        disabled={isButtonDisabled}
      >
        Войти
      </button>
      <p className="popup__subscript">
        или{" "}
        <button
          type="button"
          className="popup__subscript-button"
          onClick={handlesubscriptButton}
        >
          Зарегистрироваться
        </button>
      </p>
    </PopupWithForm>
  );
}
export default SignInPopup;
