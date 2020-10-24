export default class UserInfo {
    constructor( userNameSelector, userDescriptionSelector, userAvatarSelector ) {
        this._name = document.querySelector(userNameSelector);
        this._about = document.querySelector(userDescriptionSelector);
        this._avatar = document.querySelector(userAvatarSelector);
      }

    getUserInfo() {
        return  {        
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    setUserInfo({ name, about, avatar }) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar;
    }
}