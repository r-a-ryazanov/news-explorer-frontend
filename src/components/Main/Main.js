import React from 'react';
import './Main.css';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import NewCardList from '../NewsCardList/NewCardList.js';
import About from '../About/About.js';
import Preloader from '../Preloader/Preloader.js';
import cards from '../../utils/cards.js';
//---------------Компонент возвращает разметку главной страницы------------------------------
function Main({loggedIn,handleLoginClick, handleLogOutUser,onCardButtonClick, isPopupOpen}) {    
  return (
    <div className="main">
      <Header handleLoginButton={handleLoginClick} handleLogOutButton={handleLogOutUser} loggedIn={loggedIn} isPopupOpen={isPopupOpen}/>
      <SearchForm/>
      <Preloader isVisible={true}/>
      {cards.length > 0 && <NewCardList onCardButtonClick={onCardButtonClick} loggedIn={loggedIn} cards={cards}/>}
      <About/>
    </div>
  );
}
export default Main;