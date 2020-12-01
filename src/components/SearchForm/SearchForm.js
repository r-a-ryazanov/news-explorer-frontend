import React from "react";
import "./SearchForm.css";
import { toggleButtonState } from "../../utils/formValidator.js";
//---------------Компонент возвращает разметку секции с поиском новостей------------------------------
function SearchForm() {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [searchText, setSearchText] = React.useState("");
  //---------------Функция-обработчик клика на кнопку "Искать"------------------------------
  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleChangeSearchText(e) {
    setSearchText(e.target.value);
    toggleButtonState(
      document.querySelector(".search-form"),
      setIsButtonDisabled
    );
  }
  return (
    <section className="search-section" onSubmit={handleSubmit}>
      <form className="search-form">
        <h1 className="search-form__title">Что творится в мире?</h1>
        <h3 className="search-form__note">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном
          кабинете.
        </h3>
        <input
          className="search-form__input"
          required
          value={searchText}
          onChange={handleChangeSearchText}
        />
        <button type="submit" className={`search-form__submit ${isButtonDisabled&&"search-form__submit_disabled"}`} disabled={isButtonDisabled}>
          Искать
        </button>
      </form>
    </section>
  );
}
export default SearchForm;
