import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector(".popup__image");
      this._popupTitleImage = this._popup.querySelector(".popup__title-image");
    }

    open({ name, link }) {
        this._popupImage.src = link; 
        this._popupImage.alt = name;
        this._popupTitleImage.textContent = name; 
        super.open();
    }
}