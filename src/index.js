import '../styles/index.css';
import { 
  initialCards, 
  openEditFormModalWindowButton, 
  openCardFormModalWindowButton,
  editFormModalWindowName,
  editFormModalWindowAbout,
  cardFormModalWindowNameCard,
  cardFormModalWindowLink,
  elements 
} from "../utils/constans.js"

import Card from "../scripts/Card.js";
import Section from "../components/Section.js"
import FormValidator from "../scripts/FormValidator.js";
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
  const card = new Card(item, ".card");
  const cardElement = card.createCard();
  elements.prepend(cardElement);  
  const imageCard = cardElement.querySelector(".element__image");
  imageCard.addEventListener("click",() => image.open(imageCard));
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    makeCard(item);
  }
}, elements);

cardList.renderItems();

const edit = new PopupWithForm( 
  {renderer: (event) => {
    event.preventDefault();
    user.setUserInfo();
    edit.close(); }
  }, '.popup_type_edit');

const add = new PopupWithForm(  
  {renderer: (event) => {
    event.preventDefault();
    const item = {
      name: cardFormModalWindowNameCard.value,
      link: cardFormModalWindowLink.value,
    };
    makeCard(item);
    add.close(); }
  },'.popup_type_add');

const image = new PopupWithImage('.popup_type_image');
const user = new UserInfo(editFormModalWindowName.value, editFormModalWindowAbout.value);

openEditFormModalWindowButton.addEventListener("click", function () {
  user.getUserInfo();
  edit.open();
});

openCardFormModalWindowButton.addEventListener("click", function () {
  add.open();
  cardFormModalWindowNameCard.value = "";
  cardFormModalWindowLink.value = "";
});


