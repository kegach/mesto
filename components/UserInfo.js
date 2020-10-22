
export default class UserInfo {
    constructor(nameSelector, aboutSelector){
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._title = document.querySelector(".profile__author");
        this._subtitle = document.querySelector(".profile__profession");
        this._avatar = document.querySelector('.profile__avatar');
    }

    getUserInfo() {
        const name = this._name.textContent;
        const about = this._about.textContent;
        return  {  name, about };
    }

    setUserInfo(values) {
        this._name.textContent = values[0];
        this._about.textContent = values[1];
    }

    setData(res) {
        this._title.textContent = res.name;
        this._subtitle.textContent = res.about;
        this._avatar.src = res.avatar;
    }

}