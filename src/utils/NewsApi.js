class NewsApi {
  constructor(options) {
    this._options = options;
  }
  _currentDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  }
  _weekAgoDate() {
    const date = new Date();
    const lastDate = new Date(date - 7 * 24 * 3600 * 1000);
    return `${lastDate.getFullYear()}-${lastDate.getMonth()}-${lastDate.getDate() < 10 ? `0${lastDate.getDate()}` : lastDate.getDate()}`;
  }
  //--------Функция запроса новостей
  getNewsCardList(request) {
    return fetch(`${this._options.baseUrl}q=${request}&language=ru&from=${this._currentDate()}&to=${this._weekAgoDate()}&pageSize=100&apiKey=${this._options.apiKey}`, {
        method: 'GET'
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
  }
}
const newsApi = new NewsApi({
  baseUrl: 'https://nomoreparties.co/news/v2/everything?',
  apiKey: '31c7d7bf40a14319a76676ec892cb7b5'
});
export default newsApi;