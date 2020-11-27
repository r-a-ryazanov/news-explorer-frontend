import React from 'react';
import './NewCardList.css';
import NewCard from '../NewsCard/NewCard.js';
//---------------Компонент возвращает разметку секции с карточками------------------------------
function NewCardList({onCardButtonClick, loggedIn, cards}) {
  return (
    <section className="new-card-list">
      <h3 className={`new-card-list__title ${window.location.pathname === '/'&&'new-card-list__title_visible'}`}>Результаты поиска</h3>
      <div className="new-card-list__card-grid">
        {cards && cards.map((item) => (
          <NewCard card={item } key={item._id} onCardButtonClick={onCardButtonClick} loggedIn={loggedIn}/>
        ))}
      </div>
      <button className={`new-card-list-button ${window.location.pathname === '/'&&'new-card-list__button_visible'}`}>Показать еще</button>
    </section>
  );
}
export default NewCardList;