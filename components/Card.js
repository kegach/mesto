export default class Card {
  constructor(data, {handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
      this._cardElementImage = cardElement.querySelector(".element__image");
      this._cardElementText = cardElement.querySelector(".element__text");
      return cardElement; 

  }

  _toggleLike() {
    this.classList.toggle("element__like_black");
  }

  _toggleDelete() {
    this.closest(".element").remove();
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardElementText.textContent = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = 'картинка карточки' + this._name;
    this._handleCardClick(this._cardElementImage);
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__group")
      .addEventListener("click", this._toggleLike);
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._toggleDelete);
  }
}

