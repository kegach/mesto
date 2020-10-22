
import "./index.css";
import {
  openEditFormModalWindowButton,
  openCardFormModalWindowButton,
  editFormModalWindowName,
  editFormModalWindowAbout,
  cardFormModalWindowNameCard,
  cardFormModalWindowLink,
  elements,
  title,
  subtitle,
  avatar,
} from "../utils/constans.js";

import Api from "../components/Api.js"
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithSubmit from "../components/PopupWithSubmit";
export const obj = {
  formSelector: "popup__content",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
};

const api = new Api({
  baseUrl:'https://mesto.nomoreparties.co/v1/cohort-16', 
  header:'5970834d-829a-4949-981e-67b7964aa69e'
});

export const editValid = new FormValidator(obj, ".popup_type_edit");
export const cardValid = new FormValidator(obj, ".popup_type_add");

editValid.enableValidation();
cardValid.enableValidation();

function makeCard(item) { 
  const card = new Card(
    item,
    {
      handleCardClick: (element) => {
        element.addEventListener("click", () => {
          imagePopup.open(element);
        });
      }, 
      handleLikeClick: (element) => {   
          api.getLike(item);
          element.querySelector(".element__number").textContent = item.like.length + 1;
          element.querySelector(".element__like").addEventListener('click', () => {
            api.deleteLike(item);
            element.querySelector(".element__number").textContent = item.like.length;
        })
      },
      handleDeleteClick: (card) => {
        deletePopup.open(item, card);
      },
    },
    ".card"
  );
  const cardElement = card.createCard();
  elements.prepend(cardElement);
}

const editPopup = new PopupWithForm(
  {
    formSubmit: (values) => {
      api.editUserInfo(values)
      .finally(() => {
        renderLoading(".popup_type_edit", true);
      });
      userInfo.setUserInfo(values);
      editPopup.close();
    },
  },
  ".popup_type_edit"
);

editPopup.setEventListeners();

const addPopup = new PopupWithForm(
  {
    formSubmit: (values) => {
      api.addCard(values)
      then((res) => {
        item.id = res;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(".popup_type_add", true);
      });
      const item = {
        name: cardFormModalWindowNameCard.value, 
        src: cardFormModalWindowLink.value,
        like: [],
        me: true,
      }
      console.log(item);
      makeCard(item);
      addPopup.close();
    },
  },
  ".popup_type_add"
);

function renderLoading(popup, isLoading) {
  if(isLoading){
    document.querySelector(popup).querySelector(".popup__save-button").textContent = "Сохранение..."
  } 
}

addPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_type_image");

imagePopup.setEventListeners();

const userInfo = new UserInfo(".profile__author", ".profile__profession");

const avatarPopup = new PopupWithForm(
  {
    formSubmit: (data) => {
      console.log(data);
      api.editAvatar(data)
      .finally(() => {
        renderLoading(".popup_type_avatar", true);
      });
      avatar.src = data[0];
      avatarPopup.close();
    },
  },
  ".popup_type_avatar"
);

avatarPopup.setEventListeners();

avatar.addEventListener("click", function () {
  avatarPopup.open();
});

openEditFormModalWindowButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  editFormModalWindowName.value = data.name;
  editFormModalWindowAbout.value = data.about;
  editPopup.open();
});

openCardFormModalWindowButton.addEventListener("click", function () {
  addPopup.open();
  cardFormModalWindowNameCard.value = "";
  cardFormModalWindowLink.value = "";
});

const deletePopup = new PopupWithSubmit(
  {
    formSubmit: (data) => {
      api.deleteCard(data);
      deletePopup.close();
    },
  },
  ".popup_type_submit"
);

deletePopup.setEventListeners();

api.getUserInfo()
.then((res) => {
  title.textContent = res.name;
  subtitle.textContent = res.about;
  avatar.src = res.avatar;
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
})
  
const newCards = function (res) {
  const cards = [];
  res.forEach((item)=>{
    const card = {};
    card.name = item.name;
    card.src = item.link;
    card.like = item.likes;
    card.id = item._id;
    cards.push(card);
  })
  console.log(cards);
  const cardList = new Section(
  {
    data: cards,
    renderer: (item) => {
      makeCard(item);
    },
  },
  elements
);
cardList.renderItems();
}

api.getCards()
.then((res) => {
  newCards(res);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
})

