import "./index.css";
import {
  openEditFormModalWindowButton,
  openCardFormModalWindowButton,
  editFormModalWindow,
  cardFormModalWindow, 
  avatarModalWindow,
  editFormModalWindowName,
  editFormModalWindowAbout,
  cardFormModalWindowNameCard,
  cardFormModalWindowLink,
  cardSelector,
  elements,
  avatar,
} from "./utils/constans.js";

import Api from "./components/Api.js"
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithSubmit from "./components/PopupWithSubmit.js";
import UserInfo from "./components/UserInfo.js";
const obj = {
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

const userInfo = new UserInfo(".profile__author", ".profile__profession", ".profile__avatar");

let myId;
// myId c9abf8b98ab1e73b19c683ea

const createCard = ({ name, link, likes, _id, owner }, myId) => {
  const card = new Card(
    { name, link, likes, _id, owner, cardSelector,
      handleCardClick: () => {
        imagePopup.open({ name, link });
      },
      handleLikeClick: () => {
        if (card.isLiked()) {
          const unlikeCard = api.deleteLike({ id: card._id });
          unlikeCard.then((cardInfo) => {
              card.setLikesCount(cardInfo.likes.length);
              card.likeCard();
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        } else {
          const likeCard = api.getLike({ id: card._id });
          likeCard.then((cardInfo) => {
              card.setLikesCount(cardInfo.likes.length);
              card.likeCard();
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        }
      },
      handleDeleteClick: (card) => {
        submitPopup.open(card);
      },
    },
    myId
  );
  const cardElement = card.createCard();
  return cardElement;
};

const cardList = new Section({
    renderer: ({ name, link, likes, _id, owner }) => {
      const card = createCard({ name, link, likes, _id, owner }, myId);
      cardList.addItem(card);
    },
  },
  elements
);

Promise.all([ api.getUserInfo(), api.getCards() ])
.then(([info, cards]) => {
  const data = info;
  myId = data._id;
  const Cards = cards.reverse();
  userInfo.setUserInfo({
    name: data.name,
    about: data.about,
    avatar: data.avatar
  });
  cardList.renderItems(Cards);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});

const editPopup = new PopupWithForm({
  formSubmit: (values) => {
    renderLoad(editFormModalWindow, true);
    const patchProfile = api.editUserInfo({
      name: values['input-name'],
      about: values['input-about']
    });
    patchProfile.then(({ name, about, avatar }) => {
      userInfo.setUserInfo({
        name: name,
        about: about,
        avatar: avatar
      });
      editPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoad(editFormModalWindow, false);
    })
  }
}, ".popup_type_edit");

editPopup.setEventListeners();

openEditFormModalWindowButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  editFormModalWindowName.value = info.name;
  editFormModalWindowAbout.value = info.about;
  editPopup.open();
});

const addPopup = new PopupWithForm({
  formSubmit: (values) => {
    renderLoad(cardFormModalWindow, true);
    const newCard = api.addCard({
      name: values['input-namecard'],
      link: values['input-link']
    });
    newCard.then(({ name, link, likes, _id, owner }) => {
      return createCard({ name, link, likes, _id, owner }, myId);
    })
    .then(cardElement => {
      cardList.addItem(cardElement);
      addPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoad(cardFormModalWindow, false);
    });
  }
}, ".popup_type_add");

addPopup.setEventListeners();

openCardFormModalWindowButton.addEventListener("click", function () { 
  cardFormModalWindowNameCard.value = ""; 
  cardFormModalWindowLink.value = "";  
  addPopup.open(); 
}); 

const imagePopup = new PopupWithImage(".popup_type_image");

imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  formSubmit: (values) => {
    renderLoad(avatarModalWindow, true);
    const patchAvatar = api.editAvatar({ avatar: values['input-link'] });
    patchAvatar.then(({  name, about, avatar }) => {
      userInfo.setUserInfo({  name, about, avatar });
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoad(avatarModalWindow, false);
    })
  }
},".popup_type_avatar");

avatarPopup.setEventListeners();

avatar.addEventListener('click', () => {
  avatarPopup.open();
});

const submitPopup = new PopupWithSubmit({
  formSubmit: (card) => {
    const deleteCard = api.deleteCard({ id: card._id });
    deleteCard.then(() => {
      card.removeCard();
      submitPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }
}, ".popup_type_submit");

submitPopup.setEventListeners();

function renderLoad(popup, isLoading) {
  if (isLoading) {
    popup.querySelector(".popup__save-button").textContent = "Сохранение...";
  } else {
    popup.querySelector(".popup__save-button").textContent = "Сохранить";
  }
}
