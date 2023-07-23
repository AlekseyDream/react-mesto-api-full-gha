class Api {
  #url;
  #headers;
  #authHeaders;
  constructor({ url, headers }) {
    this.#url = url;
    this.#headers = headers;
    this.#authHeaders = null;
  }
  deleteAuthHeaders = () => (this.#authHeaders = null);

  setAuthHeaders = (token) => {
    this.#authHeaders = {
      ...this.#headers,
      authorization: `Bearer ${token}`,
    };
  };

  #handleReply = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  #makeRequest = (method, path, body, notSave) => {
    const reqOptions = {
      method: method,
      headers: notSave ? this.#headers : this.#authHeaders,
    };
    if (body) reqOptions.body = JSON.stringify(body);

    return fetch(`${this.#url}${path}`, reqOptions).then(this.#handleReply);
  };

  registerUser = (regData) =>
    this.#makeRequest('POST', '/signup', regData, 'notSave');

  loginUser = (loginData) =>
    this.#makeRequest('POST', '/signin', loginData, 'notSave');

  getUserInfo = () => this.#makeRequest('GET', '/users/me');

  getAllCards = () => this.#makeRequest('GET', '/cards');

  updateUserInfo = (userData) =>
    this.#makeRequest('PATCH', '/users/me', userData);

  updateUserAvatar = (userData) =>
    this.#makeRequest('PATCH', '/users/me/avatar', userData);

  addNewCard = (cardData) => this.#makeRequest('POST', '/cards', cardData);

  deleteCard = (id) => this.#makeRequest('DELETE', `/cards/${id}`);

  changeLikeCardStatus = (id, isLiked) => {
    const fetchMethod = isLiked ? 'PUT' : 'DELETE';
    return this.#makeRequest(fetchMethod, `/cards/${id}/likes`);
  };
}

const api = new Api({
  //url: "https://api.dream.mesto.nomoredomains.xyz",
  url: "http://localhost:4000",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;