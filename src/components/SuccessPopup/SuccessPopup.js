import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import '../PopupWithForm/PopupWithForm.css';
//---------------Компонент возвращает разметку всплывающего успешной регистрации------------------------------
function SuccessPopup({isOpen, handleCloseButton, handlesubscriptButton}) {
  return (
    <PopupWithForm isOpen={isOpen} name="signup"  handleCloseButton={handleCloseButton} title="Пользователь успешно зарегистрирован!" >
      <p type="button" className="popup__success-button" onClick={handlesubscriptButton}>Войти</p>
    </PopupWithForm>
  );
}
export default SuccessPopup;