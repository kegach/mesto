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
        })
        }

    addCard(data) {
        return fetch (`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._header,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data[0],
                link: data[1]
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })       
        .then((result) => {
            console.log(result);
            
        }); 
    }

    deleteCard(data) {
        return fetch (`${this._url}/cards/${data.id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._header,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })      
        .then((result) => {
            console.log(result);
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
    })
    }

    editUserInfo(data) {
        return fetch (`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: this._header, 
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                name: data[0],
                about: data[1]
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          console.log(result);
        }); 
      }
      
    editAvatar(data) {
        return fetch (`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: this._header, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: data[0]
          })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          console.log(result);
        }); 
      }

    getLike(data) {
        return fetch (`${this._url}/cards/likes/${data.id}`, {
            method: 'PUT',
            headers: {
              authorization: this._header, 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              likes: data.like
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })      
        .then((result) => {
            console.log(result);
        }); 
    }

    deleteLike(data) {
        return fetch (`${this._url}/cards/likes/${data.id} `, {
            method: 'DELETE',
            headers: {
              authorization: this._header, 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              likes: data.like
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })       
        .then((result) => {
            console.log(result);
        }); 
    }
}