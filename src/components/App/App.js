import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import SignUpPopup from '../SignUpPopup/SignUpPopup.js';
import SignInPopup from '../SignInPopup/SignInPopup.js';
import SuccessPopup from '../SuccessPopup/SuccessPopup.js';
//---------------Компонент возвращает разметку всего ресурса------------------------------
function App() {  
  const [loggedIn, setloggedIn] = React.useState(false);
  const history = useHistory();
  const [isSignUpPopupOpen,setIsSignUpPopupOpen] = React.useState(false);
  const [isSignInPopupOpen,setIsSignInPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen,setIsSuccessPopupOpen] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  //---------------Функцмя закрытия всех всплывающих окон------------------------------
  function closeAllPopup(){
    setIsSignUpPopupOpen(false);
    setIsSignInPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsPopupOpen(false);
  }
  //---------------Функция-обработчик нажатия на Esc------------------------------
  function handleEscClose(evt){
    if (evt.key === "Escape") closeAllPopup();
  }
  //---------------Функция-обработчик клика по оверлэю------------------------------
  function handleOverlayClickClose(evt){
    if (evt.target.classList.contains('popup')) closeAllPopup();
  }
  React.useEffect(() =>{
    const popup = document.querySelector('.popup');
    if (popup){
      popup.addEventListener('mousedown',handleOverlayClickClose);
      document.addEventListener('keydown', handleEscClose);
      return ()=>{
        popup.removeEventListener('mousedown',handleOverlayClickClose);
        document.removeEventListener('keydown', handleEscClose);
      };
    };
  });  
  //---------------Функция открытия всплывающего окна регистрации------------------------------
  function handleAuthClick(){
    closeAllPopup();
    setIsSignUpPopupOpen(true);
    setIsPopupOpen(true);
  }
  //---------------Функция открытия всплывающего окна входа------------------------------
  function handleLoginClick(){
    closeAllPopup();
    setIsSignInPopupOpen(true);
    setIsPopupOpen(true);
  }
  //---------------Функция регистрации пользователя------------------------------
  function handleRegisterUser(){
    closeAllPopup();
    setIsSuccessPopupOpen(true);
    setIsPopupOpen(true);
  }
  //---------------Функция авторизации пользователя------------------------------
  function handleSignInUser(loginData){
    setloggedIn(true);
    closeAllPopup();         
  } 
  //---------------Функция выхода пользователя------------------------------
  function handleLogOutUser(){
    setloggedIn(false);
    history.push('/');
  }
  //---------------Функция сохранения карточки------------------------------
  function onCardButtonClick(card){
    if(window.location.pathname === '/' && loggedIn){
      document.getElementById(card._id).querySelector('.new-card__button').classList.toggle('new-card__button_marked');
    }
  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn}  handleLogOutUser={handleLogOutUser} onCardButtonClick={onCardButtonClick} handleLoginClick={handleLoginClick} isPopupOpen={isPopupOpen}/>
        </Route>
        <Route path="/saved-news">
          <SavedNews loggedIn={loggedIn} handleLogOutUser={handleLogOutUser} onCardButtonClick={onCardButtonClick} handleLoginClick={handleLoginClick} isPopupOpen={isPopupOpen}/>
        </Route>
      </Switch>
      <Footer/>
     <SignUpPopup isOpen ={isSignUpPopupOpen} handlesubscriptButton={handleLoginClick} onSignUp={handleRegisterUser} handleCloseButton={closeAllPopup}/>
     <SignInPopup isOpen ={isSignInPopupOpen} handlesubscriptButton={handleAuthClick} onSignIn={handleSignInUser} handleCloseButton={closeAllPopup}/>
     <SuccessPopup isOpen={isSuccessPopupOpen} handlesubscriptButton={handleLoginClick} handleCloseButton={closeAllPopup}/>
    </div>
  );
}

export default App;
