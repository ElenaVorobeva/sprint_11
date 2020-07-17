export class Api {
  constructor(config, API_URL) {
    this._url = config.url;
    this._headers = config.headers;
    this._method = config.method;
    this._name = config.name;
    this._about = config.about;
    this._api = API_URL;
  }

  getCards() {
    return fetch(this._url, {
      headers: this._headers
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
  }

  getUserInfo() {
    return fetch(this._url, {
      method: this._method,
      headers: this._headers,
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
  }

  uploadUserInfo(name, job, avatar) {

    return fetch(`${this._api}/cohort11/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '1800825d-661f-4200-a76e-67715bff8281',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job,
        avatar: avatar
      })

    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
  }
}