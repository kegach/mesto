import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector(".popup__image");
      this._popupTitleImage = this._popup.querySelector(".popup__title-image");
    }

    open(item) {
        this._element = item.closest(".element");
        this._image = this._element.querySelector(".element__image");
        this._titleImage = this._element.querySelector(".element__text");
        this._popupImage.src = this._image.src; 
        this._popupTitleImage.textContent = this._titleImage.textContent; 
        super.open();
    }
}