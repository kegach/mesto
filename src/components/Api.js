export default class Api{
    constructor( options ) {
        this._url = options.baseUrl;
        this._header = options.header;
    }

    getCards() {
        return fetch (`${this._url}/cards`, {
            headers: {
                authorization: this._header,
            },
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
        }

    addCard({ name, link }) {
        return fetch (`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._header,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, link })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });       
    }

    deleteCard({ id }) {
        return fetch (`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._header,
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
        }

    getUserInfo(){
    return fetch (`${this._url}/users/me`, {
        headers: {
            authorization: this._header,
        },
        })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });   
    }

    editUserInfo({name, about}) {
        return fetch (`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: this._header, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, about })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
      }
      
    editAvatar({ avatar }) {
        return fetch (`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: this._header, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ avatar })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
      }

    getLike({ id }) {
        return fetch (`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
              authorization: this._header, 
              'Content-Type': 'application/json'
            },
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });      
    }

    deleteLike({ id }) {
        return fetch (`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
              authorization: this._header, 
              'Content-Type': 'application/json'
            },
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });    
    }
}