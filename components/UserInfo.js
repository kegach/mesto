
export default class UserInfo {
    constructor(nameSelector, aboutSelector){
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
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

}