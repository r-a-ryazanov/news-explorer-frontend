import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main.js";
import SavedNews from "../SavedNews/SavedNews.js";
import Footer from "../Footer/Footer.js";
import SignUpPopup from "../SignUpPopup/SignUpPopup.js";
import SignInPopup from "../SignInPopup/SignInPopup.js";
import SuccessPopup from "../SuccessPopup/SuccessPopup.js";
import newsApi from "../../utils/NewsApi.js";
import mainApi from "../../utils/MainApi.js";
//---------------Компонент возвращает разметку всего ресурса------------------------------
function App() {
  const [loggedIn, setloggedIn] = React.useState(false);
  const history = useHistory();
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState(false);
  const [isSignInPopupOpen, setIsSignInPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [newsCardList, setNewsCardList] = React.useState([]);
  const [savedNewsCardList, setSavedNewsCardList] = React.useState([]);
  const [mainApiError, setMainApiError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAuthLoading, setIsAuthLoading] = React.useState(false);
  const [isNewsApiError, setIsNewsApiError] = React.useState(false);
  const [isNewsApiNotFound, setIsNewsApiNotFound] = React.useState(false);
  const [isEmptySearchInput, setIsEmptySearchInput] = React.useState(false);
  //---------------Функцмя закрытия всех всплывающих окон------------------------------
  function handleError(err) {
    if (err.message.search("celebrate") !== -1)
      return err.validation.body.message;
    return err.message;
  }
  function closeAllPopup() {
    setIsSignUpPopupOpen(false);
    setIsSignInPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsPopupOpen(false);
    setMainApiError("");
  }

  //---------------Функция-обработчик нажатия на Esc------------------------------
  function handleEscClose(evt) {
    if (evt.key === "Escape") closeAllPopup();
  }
  //---------------Функция-обработчик клика по оверлэю------------------------------
  function handleOverlayClickClose(evt) {
    if (evt.target.classList.contains("popup")) closeAllPopup();
  }
  React.useEffect(() => {
    const popup = document.querySelector(".popup");
    if (popup) {
      popup.addEventListener("mousedown", handleOverlayClickClose);
      document.addEventListener("keydown", handleEscClose);
      return () => {
        popup.removeEventListener("mousedown", handleOverlayClickClose);
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  });
  //---------------Функция открытия всплывающего окна регистрации------------------------------
  function handleAuthClick() {
    closeAllPopup();
    setIsSignUpPopupOpen(true);
    setIsPopupOpen(true);
  }
  //---------------Функция открытия всплывающего окна входа------------------------------
  function handleLoginClick() {
    closeAllPopup();
    setIsSignInPopupOpen(true);
    setIsPopupOpen(true);
  }
  //---------------Функция регистрации пользователя------------------------------
  function handleRegisterUser(registerData) {
    setMainApiError("");
    setIsAuthLoading(true);
    mainApi
      .registerUser(registerData)
      .then(() => {
        closeAllPopup();
        setIsSuccessPopupOpen(true);
        setIsPopupOpen(true);
        setIsAuthLoading(false);
      })
      .catch((err) => {
        err.then((res) => {
          setMainApiError(handleError(res));
          setIsAuthLoading(false);
        });
      });
  }
  //---------------Функция авторизации пользователя------------------------------
  function handleSignInUser(loginData) {
    setMainApiError("");
    setIsAuthLoading(true);
    mainApi
      .loginUser(loginData)
      .then(() => {
        setloggedIn(true);
        closeAllPopup();
        setIsAuthLoading(false);
      })
      .catch((err) => {
        err.then((res) => {
          setMainApiError(handleError(res));
          setIsAuthLoading(false);
        });
      });
  }
  //---------------Функция выхода пользователя------------------------------
  function handleLogOutUser() {
    setloggedIn(false);
    history.push("/");
  }
  //---------------Функция сохранения карточки------------------------------
  function onCardButtonClick(card) {
    if (window.location.pathname === "/" && loggedIn) {
      document
        .getElementById(card._id)
        .querySelector(".new-card__button")
        .classList.toggle("new-card__button_marked");
    }
  }
  function hasSavedNews(link) {
    return savedNewsCardList.some((item) => {
      return item.link === link;
    });
  }
  //---------------Функция обработки клика по кнопке "Искать"------------------------------
  function handleCearchClick(searchText) {
    if (searchText === "") {
      setIsEmptySearchInput(true);
    } else {
      setIsEmptySearchInput(false);
      const newArray = [];
      setNewsCardList([]);
      setIsLoading(true);
      setIsNewsApiError(false);
      setIsNewsApiNotFound(false);
      newsApi
        .getNewsCardList(searchText)
        .finally(() => {
          setIsLoading(false);
        })
        .then((res) => {
          if (res.articles.length === 0) setIsNewsApiNotFound(true);
          res.articles.forEach((item) => {
            const date = new Date(item.publishedAt);
            newArray.push({
              keyword: searchText,
              title: item.title,
              text: item.description,
              date: `${date.toLocaleString("ru-Ru", {
                day: "numeric",
                month: "long",
              })}, ${date.getFullYear()}`,
              source: item.source.name,
              link: item.url,
              image: item.urlToImage,
              isSaved: hasSavedNews(item.url),
            });
          });
          setNewsCardList(newArray);
        })
        .catch(() => {
          setIsNewsApiError(true);
        });
    }
  }
  function onCardClick(link) {
    window.open(link, "_blank");
  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main
            loggedIn={loggedIn}
            handleLogOutUser={handleLogOutUser}
            onCardButtonClick={onCardButtonClick}
            handleLoginClick={handleLoginClick}
            isPopupOpen={isPopupOpen}
            handleCearchClick={handleCearchClick}
            newsCardList={newsCardList}
            isLoading={isLoading}
            isError={isNewsApiError}
            isNotFound={isNewsApiNotFound}
            isEmptySearchInput={isEmptySearchInput}
            setIsEmptySearchInput={setIsEmptySearchInput}
            onCardClick={onCardClick}
          />
        </Route>
        <Route path="/saved-news">
          <SavedNews
            loggedIn={loggedIn}
            handleLogOutUser={handleLogOutUser}
            onCardButtonClick={onCardButtonClick}
            handleLoginClick={handleLoginClick}
            isPopupOpen={isPopupOpen}
          />
        </Route>
      </Switch>
      <Footer />
      <SignUpPopup
        isOpen={isSignUpPopupOpen}
        handlesubscriptButton={handleLoginClick}
        onSignUp={handleRegisterUser}
        handleCloseButton={closeAllPopup}
        mainApiError={mainApiError}
        isAuthLoading={isAuthLoading}
      />
      <SignInPopup
        isOpen={isSignInPopupOpen}
        handlesubscriptButton={handleAuthClick}
        onSignIn={handleSignInUser}
        handleCloseButton={closeAllPopup}
        mainApiError={mainApiError}
      />
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        handlesubscriptButton={handleLoginClick}
        handleCloseButton={closeAllPopup}
        isAuthLoading={isAuthLoading}
      />
    </div>
  );
}

export default App;
