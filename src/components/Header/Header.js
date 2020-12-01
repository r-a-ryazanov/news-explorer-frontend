import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation.js";
//---------------Компонент возвращает разметку чердака------------------------------
function Header({
  handleLoginButton,
  loggedIn,
  handleLogOutButton,
  isPopupOpen,
}) {
  const [onMenu, setOnMenu] = React.useState(false);
  //---------------Функция-обработчик нажатия на кнопку меню------------------------------
  function handleMenuButton() {
    setOnMenu(!onMenu);
  }
  //---------------Функция-обработчик нажатия на кнопку авторизации------------------------------
  function handleNavButton() {
    setOnMenu(!onMenu);
    handleLoginButton();
  }
  //---------------Функция-обработчик нажатия на кнопку выхода------------------------------
  function handleExitButton() {
    setOnMenu(!onMenu);
    handleLogOutButton();
  }
  return (
    <header className={`header ${onMenu && "header_onmenu"}`}>
      <NavLink
        exact
        to="/"
        className={`header__logo ${
          window.location.pathname === "/saved-news" &&
          !onMenu &&
          "header__logo_dark"
        }`}
      >
        NewsExplorer
      </NavLink>
      {!isPopupOpen && (
        <button
          className={`header__button ${
            window.location.pathname === "/saved-news" && "header__button_dark"
          } ${onMenu && "header__button_close"}`}
          onClick={handleMenuButton}
        />
      )}
      <Navigation
        handleAuthButton={handleNavButton}
        handleLogOutButton={handleExitButton}
        loggedIn={loggedIn}
        onMenu={onMenu}
      />
    </header>
  );
}
export default Header;
