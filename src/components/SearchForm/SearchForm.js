import React from "react";
import "./SearchForm.css";
//---------------Компонент возвращает разметку секции с поиском новостей------------------------------
function SearchForm() {
  //---------------Функция-обработчик клика на кнопку "Искать"------------------------------
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section className="search-section" onSubmit={handleSubmit}>
      <form className="search-form">
        <h1 className="search-form__title">Что творится в мире?</h1>
        <h3 className="search-form__note">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном
          кабинете.
        </h3>
        <input className="search-form__input" required />
        <button type="submit" className="search-form__submit">
          Искать
        </button>
      </form>
    </section>
  );
}
export default SearchForm;
