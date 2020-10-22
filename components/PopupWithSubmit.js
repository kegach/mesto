import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
    constructor( { formSubmit }, popupSelector) {
      super(popupSelector);
      this._formSubmit = formSubmit.bind(this);
    }

    open(data, card){
      this._data = data;
      this._card = card
      super.open();
    }
    
    close(){
      this.card.remove;
      super.close();
    }

    setEventListeners() {
        this._popup.addEventListener("submit",() => this._formSubmit(this._data));
        super.setEventListeners();
    }
}