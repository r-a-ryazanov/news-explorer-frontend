import React from "react";
import "./NewCardList.css";
import NewCard from "../NewsCard/NewCard.js";
//---------------Компонент возвращает разметку секции с карточками------------------------------
function NewCardList({ onCardButtonClick, loggedIn, cards }) {
  const [countOfCards, setCountOfCards] = React.useState(3);
  function handleButtonClick() {
    setCountOfCards(countOfCards + 3);
  }
  React.useEffect(() => {setCountOfCards(3)},[cards]);
  return (
    <section className="new-card-list">
      <h3
        className={`new-card-list__title ${
          window.location.pathname === "/" && "new-card-list__title_visible"
        }`}
      >
        Результаты поиска
      </h3>
      <div className="new-card-list__card-grid">
        {cards &&
          cards.map(
            (item, i) =>
              i < countOfCards && (
                <NewCard
                  card={item}
                  key={i}
                  onCardButtonClick={onCardButtonClick}
                  loggedIn={loggedIn}
                />
              )
          )}
      </div>
      {countOfCards<cards.length&&<button
        className={`new-card-list-button ${
          window.location.pathname === "/" && "new-card-list__button_visible"
        }`}
        onClick={handleButtonClick}
      >
        Показать еще
      </button>}
    </section>
  );
}
export default NewCardList;
