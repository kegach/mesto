import { editValid, cardValid } from "../page/index.js"
import { editFormModalWindow, cardFormModalWindow } from "../utils/constans.js"
export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
        this._popup.classList.add("popup_opened");
        if (this._popup === editFormModalWindow){ 
            editValid.enableValidation();
          } else if (this._popup === cardFormModalWindow){
            cardValid.enableValidation(); 
          }
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
  
    closePopupOverlay() {
        this._popup.classList.remove("popup_opened");
    }
     
    _handleEscClose(evt) {
        if (evt.key == "Escape") {
            this.close();
        }
    }
    
    setEventListeners() {   
        this._popup.firstElementChild.addEventListener("click", function () {
            event.stopPropagation();
        });      
        this._popup.addEventListener("click", () => this.closePopupOverlay());
        document.addEventListener("keydown", this._handleEscClose);
        this._popup.querySelector(".popup__cross-button").addEventListener("click", () => this.close());
    }
}