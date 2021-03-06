import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main.js";
import SavedNews from "../SavedNews/SavedNews.js";
import Footer from "../Footer/Footer.js";
import SignUpPopup from "../SignUpPopup/SignUpPopup.js";
import SignInPopup from "../SignInPopup/SignInPopup.js";
import SuccessPopup from "../SuccessPopup/SuccessPopup.js";
import newsApi from "../../utils/NewsApi.js";
import mainApi from "../../utils/MainApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import CurrentUserContext from "../../contexts/CurrentUserContext";

//---------------Компонент возвращает разметку всего ресурса------------------------------
function App() {
  const [loggedIn, setloggedIn] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
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
  const [currentUser, setCurrentUser] = React.useState();
  const [countOfCards, setCountOfCards] = React.useState(3);
  React.useEffect(() => {
    if (localStorage.getItem("newsCardList") != null) {
      setNewsCardList(JSON.parse(localStorage.getItem("newsCardList")));
    }
    if (localStorage.getItem("token") != null) {
      Promise.all([
        mainApi.getUserData(localStorage.getItem("token")),
        mainApi.getSavedCards(localStorage.getItem("token")),
      ])
        .then((results) => {
          if (results) {
            setloggedIn(true);
            if (location.pathname === "/saved-news")
              history.push("/saved-news");
            setCurrentUser(results[0]);
            localStorage.setItem("currentUser", results[0]);
            setSavedNewsCardList(results[1]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //---------------Функцмя закрытия всех всплывающих окон------------------------------

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
        if (typeof err === "string") {
          setMainApiError(err);
        } else {
          setMainApiError("Реурс не найден. Попробуйте позже");
        }
        setIsAuthLoading(false);
      });
  }
  //---------------Функция авторизации пользователя------------------------------
  function handleSignInUser(loginData) {
    setMainApiError("");
    setIsAuthLoading(true);
    mainApi
      .loginUser(loginData)
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result.token);
          Promise.all([
            mainApi.getUserData(result.token),
            mainApi.getSavedCards(result.token),
          ])
            .then((results) => {
              if (results) {
                setCurrentUser(results[0]);
                localStorage.setItem("currentUser", results[0]);
                setSavedNewsCardList(results[1]);
                const newArray = [];
                newsCardList.forEach((item) => {
                  let isSaved = false;
                  results[1].forEach((card) => {
                    if (item.link === card.link) {
                      isSaved = true;
                    }
                  });
                  newArray.push({
                    keyword: item.keyword,
                    title: item.title,
                    text: item.text,
                    date: item.date,
                    source: item.source,
                    link: item.link,
                    image: item.image,
                    isSaved: isSaved,
                  });
                });
                setNewsCardList(newArray);
                setloggedIn(true);
                closeAllPopup();
                setIsAuthLoading(false);
              }
            })
            .catch((err) => {
              setMainApiError(err);
              setIsAuthLoading(false);
            });
        }
      })
      .catch((err) => {
        if (typeof err === "string") {
          setMainApiError(err);
        } else {
          setMainApiError("Реурс не найден. Попробуйте позже");
        }
        setIsAuthLoading(false);
      });
  }
  //---------------Функция выхода пользователя------------------------------
  function handleLogOutUser() {
    const newArray = [];
    newsCardList.forEach((item) => {
      newArray.push({
        keyword: item.keyword,
        title: item.title,
        text: item.text,
        date: item.date,
        source: item.source,
        link: item.link,
        image: item.image,
        isSaved: false,
      });
    });
    setNewsCardList(newArray);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setSavedNewsCardList([]);
    setloggedIn(false);
    history.push("/");
  }
  //---------------Функция сохранения/удаления карточки------------------------------
  function onCardButtonClick(card) {
    if (loggedIn) {
      if (window.location.pathname === "/") {
        if (!card.isSaved) {
          mainApi
            .addCard(card, localStorage.getItem("token"))
            .then((res) => {
              if (res) {
                const newArray = [];
                newsCardList.forEach((item, i) => {
                  newArray[i] = { ...item };
                  if (newArray[i].link === card.link)
                    newArray[i].isSaved = true;
                });
                setNewsCardList(newArray);
                setSavedNewsCardList([...savedNewsCardList, res]);
                localStorage.setItem("newsCardList", JSON.stringify(newArray));
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          let id;
          savedNewsCardList.forEach((item) => {
            if (item.link === card.link) id = item._id;
          });
          mainApi
            .deleteCard(id, localStorage.getItem("token"))
            .then((res) => {
              if (res) {
                const newArray = [];
                newsCardList.forEach((item, i) => {
                  newArray[i] = { ...item };
                  if (newArray[i].link === card.link)
                    newArray[i].isSaved = false;
                });
                setNewsCardList(newArray);
                localStorage.setItem("newsCardList", JSON.stringify(newArray));
                mainApi
                  .getSavedCards(localStorage.getItem("token"))
                  .then((res) => {
                    if (res) {
                      setSavedNewsCardList(res);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        mainApi
          .deleteCard(card._id, localStorage.getItem("token"))
          .then((res) => {
            if (res) {
              const newArray = [];
              newsCardList.forEach((item, i) => {
                newArray[i] = { ...item };
                if (newArray[i].link === card.link) newArray[i].isSaved = false;
              });
              setNewsCardList(newArray);
              localStorage.setItem("newsCardList", JSON.stringify(newArray));
              mainApi
                .getSavedCards(localStorage.getItem("token"))
                .then((res) => {
                  if (res) {
                    setSavedNewsCardList(res);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else handleLoginClick();
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
          localStorage.setItem("newsCardList", JSON.stringify(newArray));
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <ProtectedRoute
            path="/saved-news"
            component={SavedNews}
            loggedIn={loggedIn}
            handleLogOutUser={handleLogOutUser}
            onCardButtonClick={onCardButtonClick}
            handleLoginClick={handleLoginClick}
            isPopupOpen={isPopupOpen}
            savedNewsCardList={savedNewsCardList}
            handleCearchClick={handleCearchClick}
            newsCardList={newsCardList}
          />
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
              countOfCards={countOfCards}
              setCountOfCards={setCountOfCards}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
