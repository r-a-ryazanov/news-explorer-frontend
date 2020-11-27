import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import '../PopupWithForm/PopupWithForm.css';
//---------------Компонент возвращает разметку всплывающего окна авторизации------------------------------
function SignInPopup({isOpen, handleCloseButton, handlesubscriptButton, onSignIn}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  //---------------Функция-обработчик клика на кнопку "Войти"------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    onSignIn({email, password});
  }
  //---------------Функция-обработчик ввода email------------------------------
  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }
   //---------------Функция-обработчик ввода пароля------------------------------
  function handleChangePassword (e) {
    setPassword(e.target.value);
  }  
  return (
    <PopupWithForm isOpen={isOpen} name="signin" onSubmit={handleSubmit} handleCloseButton={handleCloseButton} title="Вход" handlesubscriptButton={handlesubscriptButton} subscriptButtonText="Войти" subscriptText="или ">
      <p className="popup__label">Email</p>
      <input type="email" id="email-input" name="email" required placeholder="Введите почту" minLength="4"  className="popup__input" value = {email} onChange = {handleChangeEmail}/>
      <span className="popup__input-error" id="email-input-error"></span>
      <p className="popup__label">Пароль</p>
      <input type="password" id="password-input" name="password" required placeholder="Введите пароль" className="popup__input" value = {password} onChange = {handleChangePassword}/>
      <span className="popup__input-error" id="password-input-error"></span>
      <span className="popup__error" id="name-input-error"></span>
      <button type="submit" className="popup__apply-button">Войти</button>      
      <p className="popup__subscript">или <button type="button" className="popup__subscript-button" onClick={handlesubscriptButton}>Зарегистрироваться</button></p>
    </PopupWithForm>
  );
}
export default SignInPopup;