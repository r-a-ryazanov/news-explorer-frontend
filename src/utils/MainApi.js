class MainApi {
  constructor(options) {
    this._options = options;
  }
  
  //-------Функция загрузки карточек с сервера
  getInitialCards(token) {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`}  
    })
      .then(this._handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }

 
  //-----Функция удаления карточки
  deleteCard(cardId, token) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`}
    })
      .then(this._handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }
   //--------Функция добавления карточки
   addCard(inputData, token) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`},
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
      .then(this.handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }
  //--------Функция регистрации пользователя
  registerUser(registerData){
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"} ,
      body: JSON.stringify({
        "password": registerData.password,
        "email": registerData.email,
        "name":  registerData.name
      })
    })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
  //--------Функция авторизации пользователя
  loginUser(loginData){
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"} ,
      body: JSON.stringify({
        "password": loginData.password,
        "email": loginData.email 
      })
    })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.json());
    });
  }
  //--------Функция проверки токена
  verifyToken(token){
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`} 
    })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    });
  }
}
const mainApi = new MainApi({
  baseUrl: 'https://api.news-explorer.students.nomoreparties.co',
  
});
export default mainApi;