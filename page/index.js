
import "./index.css";
import {
  initialCards,
  openEditFormModalWindowButton,
  openCardFormModalWindowButton,
  editFormModalWindowName,
  editFormModalWindowAbout,
  cardFormModalWindowNameCard,
  cardFormModalWindowLink,
  elements,
} from "../utils/constans.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
export const obj = {
  formSelector: "popup__content",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
};

export const editValid = new FormValidator(obj, ".popup_type_edit");
export const cardValid = new FormValidator(obj, ".popup_type_add");

function makeCard(item) {
  const card = new Card(
    item,
    {
      handleCardClick: (element) => {
        element.addEventListener("click", () => {
          imagePopup.open(element);
          imagePopup.setEventListeners();
        });
      },
    },
    ".card"
  );
  const cardElement = card.createCard();
  elements.prepend(cardElement);
}

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      makeCard(item);
    },
  },
  elements
);

cardList.renderItems();

const editPopup = new PopupWithForm(
  {
    formSubmit: (values) => {
      userInfo.setUserInfo(values);
      editPopup.close();
    },
  },
  ".popup_type_edit"
);

const addPopup = new PopupWithForm(
  {
    formSubmit: () => {
      const item = {
        name: cardFormModalWindowNameCard.value,
        link: cardFormModalWindowLink.value,
      };
      makeCard(item);
      addPopup.close();
    },
  },
  ".popup_type_add"
);

const imagePopup = new PopupWithImage(".popup_type_image");
const userInfo = new UserInfo(".profile__author", ".profile__profession");

openEditFormModalWindowButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  editFormModalWindowName.value = data.name;
  editFormModalWindowAbout.value = data.about;
  editPopup.open();
  editPopup.setEventListeners();
});

openCardFormModalWindowButton.addEventListener("click", function () {
  addPopup.open();
  addPopup.setEventListeners();
  cardFormModalWindowNameCard.value = "";
  cardFormModalWindowLink.value = "";
});
