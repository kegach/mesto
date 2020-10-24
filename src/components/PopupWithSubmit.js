import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
    constructor( { formSubmit }, popupSelector) {
      super(popupSelector);
      this._formSubmit = formSubmit;
    }

    open(element) {
        this._element = element;
        super.open();
    }

    setEventListeners() {
        this._popup.querySelector('.popup__container').addEventListener("submit", (evt) => { 
          evt.preventDefault();
          this._formSubmit(this._element);
        }); 
        super.setEventListeners();
    }
}