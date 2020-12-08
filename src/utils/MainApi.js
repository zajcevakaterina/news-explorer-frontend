import { SERVER_URL } from "./constants";

const configMainApi = {
  baseUrl: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }

  _handleResponseError(error) {
    return error.json().then((err) => {
      return Promise.reject(err);
    });
  }

  register(userEmail, userPassword, userName) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: userPassword,
        email: userEmail,
        name: userName,
      }),
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  auth(userEmail, userPassword) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: userPassword,
        email: userEmail,
      }),
    })
      .then(this._handleResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        } else {
          return;
        }
      })
      .catch(this._handleResponseError);
  }

  autoSign(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${jwt}`,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  saveArticle(article) {
    return fetch(`${this.baseUrl}/articles`, {
      method: "POST",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        keyword: article.keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source,
        link: article.url,
        image: article.urlToImage
      }),
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  getSavedArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  deleteArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }
}

const mainApi = new MainApi(configMainApi);
export default mainApi;
