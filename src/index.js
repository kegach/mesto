
import "./index.css";
import {
  openEditFormModalWindowButton,
  openCardFormModalWindowButton,
  editFormModalWindowName,
  editFormModalWindowAbout,
  cardFormModalWindowNameCard,
  cardFormModalWindowLink,
  elements,
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
          const elementLike = element.querySelector(".element__like");
          const elementNumber = element.querySelector(".element__number");
          elementLike.classList.toggle("element__like_black");
          elementLike.addEventListener('click', () => {
            if(elementLike.classList.contains("element__like_black")) {
              api.getLike(item)
              .then((item) => {
                console.log(item);
                elementNumber.textContent = item.like.length + 1;
              })
              .catch((err) => {
                console.log(`Ошибка: ${err}`);
              })
            }
            else {
              api.deleteLike(item)
              .then((item) => {
                elementNumber.textContent = item.like.length;
              })
              .catch((err) => {
                console.log(`Ошибка: ${err}`);
              }) 
            }
        });

      },
      handleDeleteClick: (card) => {
        deletePopup.open(item, card);
      },
    },
    ".card"
  );
  const cardElement = card.createCard();
  return cardElement;
}

const editPopup = new PopupWithForm(
  {
    formSubmit: (values) => {
      api.editUserInfo(values)      
      .then((values) => {
        userInfo.setUserInfo(values);
        editPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(".popup_type_edit", true);
      });
    },
  },
  ".popup_type_edit"
);

editPopup.setEventListeners();


const addPopup = new PopupWithForm(
  {
    formSubmit: (values) => {
      api.addCard(values)
      .then((values) => {
        console.log(values);
        item.id = values._id;
        const item = {
          name: cardFormModalWindowNameCard.value, 
          src: cardFormModalWindowLink.value,
          like: [],
          me: true,
        }
        console.log(item);
        const newCard = new Section(
          {
            data: item,
            renderer: (it) => {
              newCard.addItemStart(makeCard(it));
            },
          },
          elements
        );
        newCard.renderItems();
        addPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(".popup_type_add", true);
      });

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
      .then((data) => {
        avatar.src = data[0];
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(".popup_type_avatar", true);
      });

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
  cardFormModalWindowNameCard.value = "";
  cardFormModalWindowLink.value = ""; 
  addPopup.open();
});

const deletePopup = new PopupWithSubmit(
  {
    formSubmit: (data) => {
      api.deleteCard(data)      
      .then(() => {
        deletePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    },
  },
  ".popup_type_submit"
);

deletePopup.setEventListeners();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    setUserInfo(userInfo);
    addCards(cards, userInfo.id);
  })
  .catch(error => console.log(error)); 


api.getUserInfo()
.then((res) => {
  userInfo.setData(res); 
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
      cardList.addItem(makeCard(item));
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

