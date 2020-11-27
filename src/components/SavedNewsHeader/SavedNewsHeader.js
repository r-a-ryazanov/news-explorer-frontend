import React from 'react';
import './SavedNewsHeader.css';
//---------------Компонент возвращает разметку заголовка страницы с сохраненными новостями------------------------------
function SavedNewsHeader() {  
  return (
    <div className="saved-news-header">
      <h1 className="saved-news-header__title">Сохранённые статьи</h1>
      <h3 className="saved-news-header__subtitle">Грета, у вас 5 сохранённых статей</h3>
      <p className="saved-news-header__keys">По ключевым словам: <span className="saved-news-header__keys_bold">Природа, Тайга</span> и <span className="saved-news-header__keys_bold">2-м другим</span></p>
    </div>
  );
}
export default SavedNewsHeader;