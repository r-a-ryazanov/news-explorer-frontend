import React from "react";
import "./NewCard.css";
//---------------Компонент возвращает разметку новостной карточки------------------------------
function NewCard({ card, onCardButtonClick, loggedIn, onCardClick, id }) {
  if (!card._id) card._id = id;
  function handleButtonClick() {
    onCardButtonClick(card);
  }
  function handleCardClick(evt) {
    if (!evt.target.classList.contains("new-card__button"))
      onCardClick(card.link);
  }
  return (
    <div className="new-card" id={card._id} onClick={handleCardClick}>
      <img className="new-card__image" alt="Иллюстрация" src={card.image} />
      <p className="new-card__date">{card.date}</p>
      <h3 className="new-card__title">{card.title}</h3>
      <p className="new-card__text">{card.text}</p>
      <p className="new-card__source">{card.source}</p>
      <button
        className={`new-card__button ${
          window.location.pathname === "/saved-news" &&
          "new-card__button_delete"
        } ${
          window.location.pathname === "/" &&
          card.isSaved &&
          "new-card__button_marked"
        }`}
        onClick={handleButtonClick}
      />
      {!loggedIn && (
        <p className="new-card__warning">Войдите, чтобы сохранять статьи</p>
      )}
      {window.location.pathname === "/saved-news" && (
        <p className="new-card__tip">Убрать из сохранённых</p>
      )}
      {window.location.pathname === "/saved-news" && (
        <p className="new-card__key">{card.keyword}</p>
      )}
    </div>
  );
}
export default NewCard;
