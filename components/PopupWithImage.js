import{ popupImage, popupTitleImage } from "../utils/constans.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }

    open(item) {
        const element = item.closest(".element");
        const image = element.querySelector(".element__image");
        const titleImage = element.querySelector(".element__text");
        popupImage.src = image.src; 
        popupTitleImage.textContent = titleImage.textContent; 
        super.open();
    }
}