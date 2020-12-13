import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
//---------------Компонент возвращает разметку меню чердака------------------------------
function Navigation({
  handleAuthButton,
  handleLogOutButton,
  loggedIn,
  onMenu,
  userName,
}) {
  //---------------Функция-обработчик нажатия на кнопку авторизации/выхода------------------------------
  function handleButtonClick() {
    if (loggedIn) {
      handleLogOutButton();
    } else {
      handleAuthButton();
    }
  }
  return (
    <nav className={`navigation ${onMenu && "navigation_onmenu"}`}>
      <NavLink
        exact
        to="/"
        className={`navigation__link ${
          window.location.pathname === "/" && "navigation__link_active"
        } ${
          window.location.pathname === "/saved-news" && "navigation__link_dark"
        }`}
      >
        Главная
      </NavLink>
      {loggedIn && (
        <NavLink
          exact
          to="/saved-news"
          className={`navigation__link ${
            window.location.pathname === "/saved-news" &&
            "navigation__link_active"
          } ${
            window.location.pathname === "/saved-news" &&
            "navigation__link_dark"
          }`}
        >
          Сохраненные статьи
        </NavLink>
      )}
      <div
        className={`navigation__auth-button ${
          window.location.pathname === "/saved-news" &&
          "navigation__auth-button_dark"
        }`}
        onClick={handleButtonClick}
      >
        {loggedIn ? userName : "Авторизация"}
        <div
          className={`navigation__out-logo ${
            window.location.pathname === "/saved-news" &&
            "navigation__out-logo_dark"
          } ${loggedIn && "navigation__out-logo_visible"}`}
        />
      </div>
    </nav>
  );
}
export default Navigation;
