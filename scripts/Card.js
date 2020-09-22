export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
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
    this._element.querySelector(".element__text").textContent = this._name;
    this._element.querySelector(".element__image").src = this._link;
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

