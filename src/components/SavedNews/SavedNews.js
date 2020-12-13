import React from "react";
import Header from "../Header/Header.js";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.js";
import NewCardList from "../NewsCardList/NewCardList.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
//---------------Компонент возвращает разметку страницы с сохраненными новостями------------------------------
function SavedNews({
  loggedIn,
  handleLogOutUser,
  onCardButtonClick,
  handleLoginClick,
  isPopupOpen,
  savedNewsCardList,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className="saved-news">
      <Header
        loggedIn={loggedIn}
        handleLogOutButton={handleLogOutUser}
        handleAuthButton={handleLogOutUser}
        handleLoginButton={handleLoginClick}
        isPopupOpen={isPopupOpen}
        userName={currentUser ? currentUser.name : ""}
      />
      <SavedNewsHeader
        userName={currentUser ? currentUser.name : ""}
        savedNewsCardList={savedNewsCardList}
      />
      {savedNewsCardList.length > 0 && (
        <NewCardList
          onCardButtonClick={onCardButtonClick}
          loggedIn={loggedIn}
          cards={savedNewsCardList}
          countOfCards={savedNewsCardList.length}
        />
      )}
    </div>
  );
}
export default SavedNews;
