import React from "react";
import "./Main.css";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import NewCardList from "../NewsCardList/NewCardList.js";
import About from "../About/About.js";
import Preloader from "../Preloader/Preloader.js";
import Tips from "../Tips/Tips.js";
import backgroundImage from "../../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
//---------------Компонент возвращает разметку главной страницы------------------------------
function Main({
  loggedIn,
  handleLoginClick,
  handleLogOutUser,
  onCardButtonClick,
  isPopupOpen,
  handleCearchClick,
  newsCardList,
  isLoading,
  isError,
  isNotFound,
  isEmptySearchInput,
  setIsEmptySearchInput,
  onCardClick,
  setCountOfCards,
  countOfCards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [backgroundHeight, setbackgroundHeight] = React.useState("auto");
  function setBackgroundHeight() {
    setbackgroundHeight(
      `${
        document.querySelector(".header").offsetHeight +
        document.querySelector(".search-section").offsetHeight
      }px`
    );
    document.querySelector(
      ".main__background-image"
    ).style.height = backgroundHeight;
  }
  React.useEffect(() => {
    setBackgroundHeight();
    setBackgroundHeight();
    window.addEventListener("resize", setBackgroundHeight);
    return () => {
      window.removeEventListener("resize", setBackgroundHeight);
    };
  });
  return (
    <div className="main">
      <img className="main__background-image" src={backgroundImage} alt="Фон" />
      <Header
        handleLoginButton={handleLoginClick}
        handleLogOutButton={handleLogOutUser}
        loggedIn={loggedIn}
        isPopupOpen={isPopupOpen}
        userName={currentUser ? currentUser.name : ""}
      />
      <SearchForm
        handleSearchClick={handleCearchClick}
        isError={isEmptySearchInput}
        setIsEmptySearchInput={setIsEmptySearchInput}
        isLoading={isLoading}
      />
      {isLoading && <Preloader />}
      {(isError || isNotFound) && <Tips isError={isError} />}
      {newsCardList && newsCardList.length > 0 && (
        <NewCardList
          onCardButtonClick={onCardButtonClick}
          loggedIn={loggedIn}
          cards={newsCardList}
          onCardClick={onCardClick}
          countOfCards={countOfCards}
          setCountOfCards={setCountOfCards}
        />
      )}
      <About />
    </div>
  );
}
export default Main;
