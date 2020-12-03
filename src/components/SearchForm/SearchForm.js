import React from "react";
import "./SearchForm.css";
//---------------Компонент возвращает разметку секции с поиском новостей------------------------------
function SearchForm({handleSearchClick, isError, setIsEmptySearchInput, isLoading}) {
  const [searchText, setSearchText] = React.useState("");
  //---------------Функция-обработчик клика на кнопку "Искать"------------------------------
  function handleSubmit(e) {
    e.preventDefault();   
    handleSearchClick(searchText);
  }
  function handleChangeSearchText(e) {
    setSearchText(e.target.value);
    if(e.target.value !== "") setIsEmptySearchInput(false);
  }
  return (
    <section className="search-section" onSubmit={handleSubmit}>
      <form className="search-form">
        <h1 className="search-form__title">Что творится в мире?</h1>
        <h3 className="search-form__note">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном
          кабинете.
        </h3>
        {isError&&<p className="search-form__error">Нужно ввести ключевое слово</p>}
        <input
          className="search-form__input"
          value={searchText}
          onChange={handleChangeSearchText}
          placeholder="Введите тему новости"
          disabled = {isLoading}
        />
        
        <button type="submit" className="search-form__submit">
          Искать
          <p></p>
        </button>
      </form>
    </section>
  );
}
export default SearchForm;
