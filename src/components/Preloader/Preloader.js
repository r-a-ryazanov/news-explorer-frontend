import React from "react";
import "./Preloader.css";
//---------------Компонент возвращает разметку прелоудера------------------------------
function Preloader() {
  return (
    <div className="preloader">
      <i className="preloader__circle"></i>
      <p className="preloader__title">Идет загрузка новостей...</p>
    </div>
  );
}
export default Preloader;
