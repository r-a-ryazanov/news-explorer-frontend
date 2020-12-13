import React from "react";
import "./Tips.css";
import notFoundIcon from "../../images/not-found_v1.svg";
import badRequestIcon from "../../images/bad_request.png";
//---------------Компонент возвращает разметку главной страницы------------------------------
function Tips({ isError }) {
  return (
    <div className="tips">
      <img src={isError?badRequestIcon:notFoundIcon} alt="Иконка" className="tips__icon"/>
      <h3 className="tips__title">
        {isError
          ? "Ошибка"
          : "Ничего не найдено"}
      </h3>
      <p className="tips__subtitle">
        {isError
          ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          : "К сожалению по вашему запросу ничего не найдено."}
      </p>
    </div>
  );
}
export default Tips;
