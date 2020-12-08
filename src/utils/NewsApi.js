import {NEWS_API_KEY, NEWS_URL} from './constants'

const newsConfig = {
  baseUrl: NEWS_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

class NewsApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  searchNews(keyword) {
    let currentDate = new Date();
    const currentDateFormatted = currentDate.toISOString().slice(0, 10);
    currentDate.setDate(currentDate.getDate() - 7);
    const fromDateFormatted = currentDate.toISOString().slice(0, 10);
    
    return fetch(`${this.baseUrl}q=${keyword}&apiKey=${NEWS_API_KEY}&from=${fromDateFormatted}&to=${currentDateFormatted}&sortBy=publishedAt&pageSize=50`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    });
  }
}

const newsApi = new NewsApi(newsConfig);
export default newsApi;
