class MainApi {
  constructor(options) {
    this._options = options;
  }
  _handleError(err) {
    if (err.message.search("celebrate") !== -1)
      return err.validation.body.message;
    return err.message;
  }
  _handleResponse = res => {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((err) => {
        return Promise.reject(this._handleError(err));
      });
  };
  //-------Функция загрузки карточек с сервера
  getSavedCards(token) {
    return fetch(`${this._options.baseUrl}/articles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  //-----Функция удаления карточки
  deleteCard(cardId, token) {
    return fetch(`${this._options.baseUrl}/articles/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(this._handleResponse);

  }
  //--------Функция добавления карточки
  addCard(inputData, token) {
    return fetch(`${this._options.baseUrl}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          keyword: inputData.keyword,
          title: inputData.title,
          text: inputData.text,
          date: inputData.date,
          source: inputData.source,
          link: inputData.link,
          image: inputData.image
        }),
      })
      .then(this._handleResponse);
  }
  //--------Функция регистрации пользователя
  registerUser(registerData) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: registerData.password,
        email: registerData.email,
        name: registerData.name,
      }),
    }).then(this._handleResponse);
  }
  //--------Функция авторизации пользователя
  loginUser(loginData) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: loginData.password,
        email: loginData.email,
      }),
    }).then(this._handleResponse);
  }
  //---------------Функция обновления данных пользователя
  getUserData(token) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }
}
const mainApi = new MainApi({
  baseUrl: "https://api.news-explorer.students.nomoreparties.c",
});
export default mainApi;