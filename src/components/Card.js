export default class Card {
  constructor({ name, link, likes, _id, owner, cardSelector, handleCardClick, handleLikeClick, handleDeleteClick }, userId) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
  }

  _getTemplate() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(true);
      this._cardElementImage = this._cardElement.querySelector(".element__image");
      this._cardElementText = this._cardElement.querySelector(".element__text");
      this._cardElementNumber = this._cardElement.querySelector(".element__number");
      this._cardElementLike = this._cardElement.querySelector(".element__like");
    return this._cardElement; 
  }
  
  likeCard() {
    this._cardElementLike.classList.toggle('element__like_black');
  }

  isLiked() {
    return this._cardElementLike.classList.contains('element__like_black');
  }

  setLikesCount(likes) {
    this._cardElementNumber.textContent = likes;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  createCard() {
    this._element = this._getTemplate();
    if (this._owner._id === this._userId)  {
      this._element.insertAdjacentHTML('afterbegin', '<button type="button" class="element__delete element__delete_image"></button>'); 
      this._element.querySelector('.element__delete').addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    }
    this._setEventListeners();
    this._cardElementText.textContent = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = 'картинка карточки' + this._name;
    this._cardElementNumber.textContent = this._likes.length;
    if (this._likes.some(like => { return like._id === this._userId })) {
      this.likeCard();
    }
    return this._element;
  }

  _setEventListeners() {
      this._cardElementImage.addEventListener("click", this._handleCardClick);
      this._cardElementLike.addEventListener('click',  this._handleLikeClick);
    }
  }


