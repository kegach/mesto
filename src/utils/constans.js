  export const openEditFormModalWindowButton = document.querySelector(
    ".profile__edit-button"
  );
  export const openCardFormModalWindowButton = document.querySelector(
    ".profile__add-button"
  );
  
  export const editFormModalWindow = document.querySelector(".popup_type_edit");
  export const cardFormModalWindow = document.querySelector(".popup_type_add");
  export const imageModalWindow = document.querySelector(".popup_type_image");
  export const avatarModalWindow = document.querySelector(".popup_type_avatar");
  
  export const closeEditFormModalWindowButton = editFormModalWindow.querySelector(
    ".popup__cross-button"
  );
  export const closeCardFormModalWindowButton = cardFormModalWindow.querySelector(
    ".popup__cross-button"
  );
  
  export  const closeImageModalWindowButton = imageModalWindow.querySelector(
    ".popup__cross-button"
  );
  
  export const formEdit = editFormModalWindow.querySelector(".popup__container");
  export const formCard = cardFormModalWindow.querySelector(".popup__container");
  
  export const editFormModalWindowName = editFormModalWindow.querySelector(
    "#input-name"
  );
  export const editFormModalWindowAbout = editFormModalWindow.querySelector(
    "#input-about"
  );
  export const cardFormModalWindowNameCard = cardFormModalWindow.querySelector(
    "#input-namecard"
  );
  export const cardFormModalWindowLink = cardFormModalWindow.querySelector(
    "#input-link"
  );
  
  export const title = document.querySelector(".profile__author");
  export const subtitle = document.querySelector(".profile__profession");
  export const avatar = document.querySelector('.profile__avatar');
  
  export const popupImage = imageModalWindow.querySelector(".popup__image");
  export const popupTitleImage = imageModalWindow.querySelector(".popup__title-image");
  
  export const cardSelector = '.card';
  export const elements = document.querySelector(".elements");