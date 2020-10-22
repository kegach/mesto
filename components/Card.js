export default class Card {
  constructor(data, {handleCardClick, handleLikeClick, handleDeleteClick}, cardSelector) {
    this._name = data.name;
    this._link = data.src;
    this._me = data.me;
    this._id = data.id;
    this._likeMassive = data.like;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
      this._cardElementImage = this._cardElement.querySelector(".element__image");
      this._cardElementText = this._cardElement.querySelector(".element__text");
      this._cardElementNumber = this._cardElement.querySelector(".element__number");
      this._cardElementLike = this._cardElement.querySelector(".element__like");
      return this._cardElement; 
  }
  
  _toggleDelete() { 
    this.closest(".element").remove(); 
  } 

  _toggleLike() {
    this._cardElementLike.classList.toggle("element__like_black");
  }

  createCard() {
    this._element = this._getTemplate();
    if (this._me === true) {
      this._element.insertAdjacentHTML('afterbegin', '<button type="button" class="element__delete element__delete_image"></button>'); 
    }
    this._setEventListeners();
    this._cardElementText.textContent = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = 'картинка карточки' + this._name;
    this._cardElementNumber.textContent = this._likeMassive.length;
    this._handleCardClick(this._cardElementImage);
    return this._element;
  }

  _setEventListeners() {
    this._cardElementLike.addEventListener("click", () => { this._handleLikeClick(this._cardElement)});
    if (this._me === true) {
      this._deleteButton = this._cardElement.querySelector(".element__delete")
      this._deleteButton.addEventListener("click", () => { this._handleDeleteClick(this._cardElement)});
    }
  }
}

