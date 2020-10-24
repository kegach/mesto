export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
      this._handleClickClose = this._handleClickClose.bind(this);
    }
  
    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
     
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleClickClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
      }
    
    setEventListeners() {   
        this._popup.querySelector(".popup__cross-button").addEventListener("click", () => this.close()); 
        this._popup.addEventListener("click", this._handleClickClose);
    }
} 