import React from "react";
import "./SavedNewsHeader.css";
//---------------Компонент возвращает разметку заголовка страницы с сохраненными новостями------------------------------
function SavedNewsHeader({ userName, savedNewsCardList }) {
  function declensionOfWords(number, textList) {
    const cases = [2, 0, 1, 1, 1, 2];
    return textList[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }
  function keywordsList() {
    const keywordsArray = [];
    savedNewsCardList.forEach((item, i) => {
      if (
        !keywordsArray.some((keyword) => {
          return item.keyword === keyword;
        })
      )
        keywordsArray.push(item.keyword);
    });
    return keywordsArray;
  }
  const keywordsArray = keywordsList();
  return (
    <div className="saved-news-header">
      <h1 className="saved-news-header__title">Сохранённые статьи</h1>
      <h3 className="saved-news-header__subtitle">
        {userName}, у вас {savedNewsCardList.length}{" "}
        {declensionOfWords(savedNewsCardList.length, [
          "сохранённая статья",
          "сохранённые статьи",
          "сохранённых статей",
        ])}
      </h3>
      {keywordsArray.length > 0 && (
        <p className="saved-news-header__keys">
          {keywordsArray.length > 1
            ? "По ключевым словам: "
            : "По ключевому слову: "}
          <span className="saved-news-header__keys_bold">
            {keywordsArray[0]}
            {keywordsArray.length > 1 &&
              `, ${keywordsArray[1]}`}
          </span>
          {keywordsArray.length > 2 && " и "}
          {keywordsArray.length > 2 && (
            <span className="saved-news-header__keys_bold">
              {keywordsArray.length - 2}
              {declensionOfWords(keywordsArray.length - 2, [
                "-й другой",
                "-м другим",
                "-и другим",
              ])}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
export default SavedNewsHeader;
