class Api {
    constructor(apiParameters) {
      this._url = apiParameters.url;
      this._headers = apiParameters.headers;
    }
  
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`код ошибки: ${res.status}`);
      }
    }
  
    getUserInfo() {
      return fetch(`${this._url}/users/me`, { 
        headers: this._headers 
      })
      .then(res => { return this._handleResponse(res); })
    }
  
    getAllCards() {
      return fetch(`${this._url}/cards`, { 
        headers: this._headers 
      })
      .then(res => { return this._handleResponse(res); })
    }
  
    updateUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name: data.name, about: data.about }),
      })
      .then(res => { return this._handleResponse(res); })
    }
  
    addNewCard({ name, link }) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link }),
      })
      .then(res => { return this._handleResponse(res); })
    }
  
    deleteCard(Id) {
      return fetch(`${this._url}/cards/${Id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => { return this._handleResponse(res); })
    }
  
    setCardLike(Id) {
      return fetch(`${this._url}/cards/${Id}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(res => { return this._handleResponse(res); })
    }
  
    deleteCardLike(Id) {
      return fetch(`${this._url}/cards/${Id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => { return this._handleResponse(res); })
    }
  
    updateAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
      })
      .then(res => { return this._handleResponse(res); })
    }

    changeLikeCardStatus(id, isLiked) {
      if (isLiked) {
        return this.setCardLike(id);
      } else {
        return this.deleteCardLike(id);
      }
    }
  }

  const api = new Api ({
    url: "https://mesto.nomoreparties.co/v1/cohort-62",
    headers: {
      "Content-Type": "application/json",
      authorization: "94c5f97f-b8cd-4838-8c4c-bf26058ba6d0",
    },
  });

  export default api;