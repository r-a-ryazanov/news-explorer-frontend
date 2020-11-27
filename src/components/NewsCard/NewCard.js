import React from 'react';
import './NewCard.css';
//---------------Компонент возвращает разметку новостной карточки------------------------------
function NewCard({card, onCardButtonClick, loggedIn}) {
  function handleButtonClick(){
    onCardButtonClick(card);
  }
  return (
    <div className="new-card" id={card._id}>
      <img className="new-card__image" alt="Иллюстрация" src={card.image}></img>
      <p className="new-card__date">{card.date}</p>
      <h3 className="new-card__title">{card.title}</h3>
      <p className="new-card__text">{card.text}</p>
      <p className="new-card__source">{card.source}</p>
      <button className={`new-card__button ${window.location.pathname === '/saved-news'&&'new-card__button_delete'}`} onClick={handleButtonClick}/>
      {!loggedIn&&<p className="new-card__warning">Войдите, чтобы сохранять статьи</p>}
      {window.location.pathname === '/saved-news'&&<p className="new-card__tip">Убрать из сохранённых</p>}
      {window.location.pathname === '/saved-news'&&<p className="new-card__key">{card.keys[0]}</p>}
    </div>
  );
}
export default NewCard;