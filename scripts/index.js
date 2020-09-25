const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const openEditFormModalWindowButton = document.querySelector(
  ".profile__edit-button"
);
const openCardFormModalWindowButton = document.querySelector(
  ".profile__add-button"
);

const editFormModalWindow = document.querySelector(".popup_type_edit");
const cardFormModalWindow = document.querySelector(".popup_type_add");
const imageModalWindow = document.querySelector(".popup_type_image");

const closeEditFormModalWindowButton = editFormModalWindow.querySelector(
  ".popup__cross-button"
);
const closeCardFormModalWindowButton = cardFormModalWindow.querySelector(
  ".popup__cross-button"
);

const closeImageModalWindowButton = imageModalWindow.querySelector(
  ".popup__cross-button"
);

const formEdit = editFormModalWindow.querySelector(".popup__container");
const formCard = cardFormModalWindow.querySelector(".popup__container");

const editFormModalWindowName = editFormModalWindow.querySelector(
  "#input-name"
);
const editFormModalWindowAbout = editFormModalWindow.querySelector(
  "#input-about"
);
const cardFormModalWindowNameCard = cardFormModalWindow.querySelector(
  "#input-namecard"
);
const cardFormModalWindowLink = cardFormModalWindow.querySelector(
  "#input-link"
);

const title = document.querySelector(".profile__author");
const subtitle = document.querySelector(".profile__profession");

const popupImage = imageModalWindow.querySelector(".popup__image");
const popupTitleImage = imageModalWindow.querySelector(".popup__title-image");

const elements = document.querySelector(".elements");

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const obj = {
  formSelector: "popup__content",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
};

const editValid = new FormValidator(obj, ".popup_type_edit");
const cardValid = new FormValidator(obj, ".popup_type_add");

function makeCard(item) {
  const card = new Card(item, ".card");
  const cardElement = card.createCard();
  elements.prepend(cardElement);  const imageCard = cardElement.querySelector(".element__image");
  imageCard.addEventListener("click", () => openImage(imageCard));
}

initialCards.forEach(function (item) {
  makeCard(item);
});

function activateValidation(mod) {
  const inputList = Array.from(mod.querySelectorAll(".popup__input"));
  const buttonElement = mod.querySelector(".popup__save-button");
  buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
  if (mod === editFormModalWindow){ 
    const validActive = editValid.enableValidation();   
    inputList.forEach((inputElement) => {
      const validActiveHide = editValid._hideInputError(inputElement);
    });
  } else if (mod === cardFormModalWindow){
    const validActive = cardValid.enableValidation();   
    inputList.forEach((inputElement) => {
      const validActiveHide = cardValid._hideInputError(inputElement);
    });
  }
}

function openPopup(mod) {
  if ( mod !== imageModalWindow){
    activateValidation(mod); 
  }
  mod.classList.add("popup_opened");
  mod.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", escClose);
  mod.firstElementChild.addEventListener("click", function () {
    event.stopPropagation();
  });
}

function openImage(item) {
  const element = item.closest(".element");
  const image = element.querySelector(".element__image");
  const titleImage = element.querySelector(".element__text");
  popupImage.src = image.src;
  popupTitleImage.textContent = titleImage.textContent;
  openPopup(imageModalWindow);
}

openEditFormModalWindowButton.addEventListener("click", function () {
  openPopup(editFormModalWindow);
  editFormModalWindowName.value = title.textContent;
  editFormModalWindowAbout.value = subtitle.textContent;
});

openCardFormModalWindowButton.addEventListener("click", function () {
  openPopup(cardFormModalWindow);
  cardFormModalWindowNameCard.value = "";
  cardFormModalWindowLink.value = "";
});

function closePopupOverlay(evt) {
  evt.currentTarget.classList.remove("popup_opened");
}

function closePopup(mod) {
  mod.classList.remove("popup_opened");
  mod.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", escClose);
}

function escClose(evt) {
  const esc = evt.currentTarget.querySelectorAll(".popup");
  if (evt.key === "Escape") {
    esc.forEach(function (item) {
      closePopup(item);
    });
  }
}

closeEditFormModalWindowButton.addEventListener("click", () =>
  closePopup(editFormModalWindow)
);

closeCardFormModalWindowButton.addEventListener("click", () =>
  closePopup(cardFormModalWindow)
);

closeImageModalWindowButton.addEventListener("click", () =>
  closePopup(imageModalWindow)
);

function formSubmitHandler(evt) {
  evt.preventDefault();
  title.textContent = editFormModalWindowName.value;
  subtitle.textContent = editFormModalWindowAbout.value;
  closePopup(editFormModalWindow);
}

function formSubmitNewCard(evt) {
  evt.preventDefault();
  const item = {
    name: cardFormModalWindowNameCard.value,
    link: cardFormModalWindowLink.value,
  };
  makeCard(item);
  closePopup(cardFormModalWindow);
}

formEdit.addEventListener("submit", formSubmitHandler);
formCard.addEventListener("submit", formSubmitNewCard);

