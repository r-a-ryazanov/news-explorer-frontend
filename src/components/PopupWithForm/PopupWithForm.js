import React, { Children } from "react";
import "./PopupWithForm.css";
//---------------Компонент возвращает разметку всплывающего окна------------------------------
function PopupWithForm({
  isOpen,
  name,
  onSubmit,
  handleCloseButton,
  title,
  children,
}) {
  if (!isOpen) return null;
  return (
    <div className="popup">
      <form
        id={`${name}-form`}
        name={`${name}-form`}
        method="GET"
        action="#"
        className="popup__container"
        noValidate
        onSubmit={onSubmit}
      >
        <h3 className="popup__title">{title}</h3>
        {children}
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button"
          onClick={handleCloseButton}
        ></button>
      </form>
    </div>
  );
}
export default PopupWithForm;
