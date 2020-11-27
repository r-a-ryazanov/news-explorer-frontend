import React from 'react';
import Header from '../Header/Header.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewCardList from '../NewsCardList/NewCardList.js';
import savedCards from '../../utils/savedCards';
//---------------Компонент возвращает разметку страницы с сохраненными новостями------------------------------
function SavedNews({loggedIn, handleLogOutUser,onCardButtonClick, handleLoginClick, isPopupOpen}) {  
  return (
    <div className="saved-news">
      <Header loggedIn={loggedIn} handleLogOutButton={handleLogOutUser} handleAuthButton={handleLogOutUser} handleLoginButton={handleLoginClick} isPopupOpen={isPopupOpen}/>
      <SavedNewsHeader/>
     {savedCards.length > 0 && <NewCardList onCardButtonClick={onCardButtonClick} loggedIn={loggedIn} cards={savedCards}/>}
    </div>
  );
}
export default SavedNews;