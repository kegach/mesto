import { editFormModalWindow, cardFormModalWindow } from "../utils/constans.js"
import { obj, editValid, cardValid } from "../page/index.js"
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor( { formSubmit }, popupSelector) {
      super(popupSelector);
      this._formSubmit = formSubmit.bind(this);
    }

    close() {        
        const inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
        const buttonElement = this._popup.querySelector(".popup__save-button");
        buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
        if (this._popup === editFormModalWindow){ 
          this.resetValidation(editValid, inputList);
        } else if (this._popup === cardFormModalWindow){
          this.resetValidation(cardValid, inputList); 
        }
        super.close();
    }
      
    resetValidation (item, inputList) {
        inputList.forEach((inputElement) => {
          item._hideInputError(inputElement);
        })
    }

    closePopupOverlay() {
        super.closePopupOverlay();
        this.close();
    }

    _getInputValues() {
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._formValues = {};
        for (let i = 0; i < this._inputList.length; i++) {
          this._formValues[i] = this._inputList[i].value;
        }
        return this._formValues;
    }

    setEventListeners() {
        this._popup.addEventListener("submit", () => {
          const values =  this._getInputValues();
          this._formSubmit(values)
        });
        super.setEventListeners();
    }
}