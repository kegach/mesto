export default class Popup {
    constructor(popupSelector) {
      this._popupSelector = document.querySelector(popupSelector);
    }
  
    open() {
        this._popupSelector.classList.add("popup_opened");
        this._popupSelector.addEventListener("click", () => this.closePopupOverlay(this._popupSelector));
        document.addEventListener("keydown", () => this._handleEscClose(event));
        this._popupSelector.firstElementChild.addEventListener("click", function () {
            event.stopPropagation();
        });
        this.setEventListeners();
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        this._popupSelector.removeEventListener("click", () => this.closePopupOverlay(this._popupSelector));
        document.removeEventListener("keydown", () => this._handleEscClose(event));
    }
  
    closePopupOverlay(item) {
        item.classList.remove("popup_opened");
      }
     
    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }
    
    setEventListeners() {
        this._popupSelector.querySelector(".popup__cross-button").addEventListener("click", () => this.close());
    }
}