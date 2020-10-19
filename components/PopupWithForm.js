import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor( { formSubmit }, popupSelector) {
      super(popupSelector);
      this._formSubmit = formSubmit.bind(this);
    }

    close() {        
      this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
      this._buttonElement = this._popup.querySelector(".popup__save-button");
      this._buttonElement.classList.remove("popup__save-button_inactive");
      this._inputList.forEach((inputElement) => {
        this._errorElement = this._popup.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove("popup__input_error");
        this._errorElement.classList.remove("popup__input-error_active");
        this._errorElement.textContent = "";
      })
      super.close();
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
          this._formSubmit(values);
        });
        super.setEventListeners();
    }
}