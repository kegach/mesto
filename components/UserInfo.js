import { title, subtitle, editFormModalWindowName, editFormModalWindowAbout } from "../utils/constans.js";

export default class UserInfo {
    constructor( data ){
        this._name = data.name;
        this._about = data.about;
    }

    getUserInfo() {
        this._name = title.textContent; 
        this._about = subtitle.textContent;
    }

    setUserInfo() {
        title.textContent= editFormModalWindowName.value;
        subtitle.textContent = editFormModalWindowAbout.value;
    }

}