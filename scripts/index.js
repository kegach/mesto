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
const saveEditFormModalWindowButton = editFormModalWindow.querySelector(
  ".popup__save-button"
);
const saveCardFormModalWindowButton = cardFormModalWindow.querySelector(
  ".popup__save-button"
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
const template = document.querySelector("#temp").content;


initialCards.forEach(function (item) {
  prependCard(item.name, item.link);
});

function openPopup(mod) {
  const inputList = Array.from(mod.querySelectorAll(".popup__input"));
  const buttonElement = mod.querySelector(".popup__save-button");

  clearModal(
    {
      formSelector: "popup__content",
      inputSelector: "popup__input",
      submitButtonSelector: "popup__save-button",
      inactiveButtonClass: "popup__save-button_inactive",
      inputErrorClass: "popup__input_error",
      errorClass: "popup__input-error_active",
    },
    mod,
    inputList,
    buttonElement
  );

  mod.classList.add("popup_opened");
  mod.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", escClose);
  mod.firstElementChild.addEventListener("click", function () {
    event.stopPropagation();
  });
}

function clearModal(obj, mod, inputList, buttonElement) {
  inputList.forEach((inputElement) => {
    hideInputError(obj, mod.firstElementChild, inputElement);
    buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
  });
}

function closePopupOverlay(evt) {
  evt.currentTarget.classList.remove("popup_opened");
}

function closePopup(mod) {
  mod.classList.remove("popup_opened");  
  mod.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", escClose);
}

function escClose(evt) {
  const esc = evt.currentTarget.querySelectorAll('.popup');
  if (evt.key === "Escape") {
    esc.forEach(function(item) {
       closePopup(item);
    })
  }
}

function prependCard(cardName, cardLink) {
  elements.prepend(createCard(cardName, cardLink));
}

function createCard(cardName, cardLink) {
  const element = template.cloneNode(true);
  element.querySelector(".element__text").textContent = cardName;
  element.querySelector(".element__image").src = cardLink;
  const like = element.querySelector(".element__group");
  like.addEventListener("click", toggleLike);
  const deleteCard = element.querySelector(".element__delete");
  deleteCard.addEventListener("click", toggleDelete);
  const imageCard = element.querySelector(".element__image");
  imageCard.addEventListener("click", () => openImage(imageCard));
  return element;
}

function toggleLike(evt) {
  evt.target.classList.toggle("element__like_black");
}

function toggleDelete(evt) {
  evt.target.closest(".element").remove();
}

function openImage(item) {
  const element = item.closest(".element");
  const image = element.querySelector(".element__image");
  const titleImage = element.querySelector(".element__text");
  popupImage.src = image.src;
  popupTitleImage.textContent = titleImage.textContent;
  openPopup(imageModalWindow);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  title.textContent = editFormModalWindowName.value;
  subtitle.textContent = editFormModalWindowAbout.value;
  closePopup(editFormModalWindow);
}

function formSubmitNewCard(evt) {
  evt.preventDefault();
  prependCard(cardFormModalWindowNameCard.value, cardFormModalWindowLink.value);
  closePopup(cardFormModalWindow);
}

formEdit.addEventListener("submit", formSubmitHandler);
formCard.addEventListener("submit", formSubmitNewCard);

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

closeEditFormModalWindowButton.addEventListener("click", () =>
  closePopup(editFormModalWindow)
);

closeCardFormModalWindowButton.addEventListener("click", () =>
  closePopup(cardFormModalWindow)
);

closeImageModalWindowButton.addEventListener("click", () =>
  closePopup(imageModalWindow)
);
