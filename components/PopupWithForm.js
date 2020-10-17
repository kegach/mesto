import { formEdit, formCard, editFormModalWindow, cardFormModalWindow } from "../utils/constans.js"
import { obj, editValid, cardValid } from "../src/index.js"
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor( { renderer }, popupSelector) {
      super(popupSelector);
      this._renderer = renderer;
    }

    open() {
        const inputList = Array.from(this._popupSelector.querySelectorAll(".popup__input"));
        this._getInputValues(inputList);
        const buttonElement = this._popupSelector.querySelector(".popup__save-button");
        buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
        if (this._popupSelector === editFormModalWindow){ 
          this.resetValidation(editValid, inputList);
        } else if (this._popupSelector === cardFormModalWindow){
          this.resetValidation(cardValid, inputList); 
        }
        super.open();
    }
      
    resetValidation (item, inputList) {
        item.enableValidation();
        inputList.forEach((inputElement) => {
          item._hideInputError(inputElement);
        })
      }

    _getInputValues(massive) {
      const valueMassive = [];
      massive.forEach((item) => {
        valueMassive.push(item.value);
      })
    }

    setEventListeners() {
      formEdit.addEventListener("submit", () => this._renderer(event));
      formCard.addEventListener("submit", () => this._renderer(event));
      super.setEventListeners();
    }
}