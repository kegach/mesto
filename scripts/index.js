    const initialCards = [
      {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },
      {
          name: 'Байкал',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
      }
    ];      
    
    initialCards.forEach( function(item){ 
      createCards(item.name, item.link); 
    });

    const openEditFormModalWindowButton = document.querySelector('.profile__editbutton');
    const openCardFormModalWindowButton = document.querySelector('.profile__addbutton');
        
    const editFormModalWindow = document.querySelector('.popup_type_edit');
    const cardFormModalWindow = document.querySelector('.popup_type_add');
    const imageModalWindow = document.querySelector('.popup_type_image');
    const closeEditFormModalWindowButton = editFormModalWindow.querySelector('.popup__crossbutton');
    const closeCardFormModalWindowButton = cardFormModalWindow.querySelector('.popup__crossbutton');
    const closeImageModalWindowButton = imageModalWindow.querySelector('.popup__crossbutton');
    const saveEditFormModalWindowButton = editFormModalWindow.querySelector('.popup__savebutton');
    const saveCardFormModalWindowButton = cardFormModalWindow.querySelector('.popup__savebutton');

    const formName = editFormModalWindow.querySelector('.popup__container');
    const formCard = cardFormModalWindow.querySelector('.popup__container');

    const editFormModalWindowName = editFormModalWindow.querySelector('.popup__first-line');
    const editFormModalWindowAbout = editFormModalWindow.querySelector('.popup__second-line');
    const cardFormModalWindowNameCard = cardFormModalWindow.querySelector('.popup__first-line');
    const cardFormModalWindowLink = cardFormModalWindow.querySelector('.popup__second-line');

    const title = document.querySelector('.profile__author');
    const subtitle = document.querySelector('.profile__profession');
    
    const images = document.querySelectorAll('.element__image');
    const popupImage = imageModalWindow.querySelector('.popup__image');
    const popupTitleImage = imageModalWindow.querySelector('.popup__titleimage');

    const elementlikes = document.querySelectorAll('.element__group');
    const elementdeletes = document.querySelectorAll('.element__delete'); 
    const elements = document.querySelector('.elements');
    
    elementlikes.forEach(function(item){
      item.addEventListener('click', () => toggleLike(item));
    }); 

    elementdeletes.forEach(function(item){
      item.addEventListener('click', () => toggleDelete(item));
    }); 

    images.forEach(function(item){
      item.addEventListener('click', () => togglePopup(imageModalWindow));
      item.addEventListener('click', () => openImage(item));
    }); 
    
    function togglePopup(mod) {
      mod.classList.toggle('popup_opened'); 
    }; 

    function formSubmitHandler (evt) {
      evt.preventDefault(); 
      title.textContent = editFormModalWindowName.value;
      subtitle.textContent = editFormModalWindowAbout.value;
    }; 

    function createCards(cardName, cardLink){
      const elements = document.querySelector('.elements');
      const template = document.querySelector('#temp').content;
      const element = template.cloneNode(true);        
      element.querySelector('.element__titletext').textContent = cardName;
      element.querySelector('.element__image').src = cardLink;
      appendCard (element);
    };

    function formNewCard (){ 
      const elements = document.querySelector('.elements');
      const template = document.querySelector('#temp').content;
      const element = template.cloneNode(true);  
      element.querySelector('.element__image').src = cardFormModalWindowLink.value;
      element.querySelector('.element__titletext').textContent = cardFormModalWindowNameCard.value;
      const like = element.querySelector('.element__group');
      like.addEventListener('click', () => toggleLike(like));
      const deleteCard = element.querySelector('.element__delete');
      deleteCard.addEventListener('click', () => toggleDelete(deleteCard));
      const imageCard = element.querySelector('.element__image');
      imageCard.addEventListener('click', () => togglePopup(imageModalWindow));
      imageCard.addEventListener('click', () => openImage(imageCard));
      prependCard (element);
    };

    function prependCard (element){ 
      const elements = document.querySelector('.elements');
      elements.prepend(element);
    };

    function appendCard (element){ 
      const elements = document.querySelector('.elements');
      elements.append(element);
    };

    function formSubmitNewCard (evt){
      evt.preventDefault(); 
    };

    function toggleLike(item) {
      const element = item.closest('.element');
      const like = element.querySelector('.element__like');
      like.classList.toggle('element__like_white');
      like.classList.toggle('element__like_black'); 
    }; 
    
    function toggleDelete(item) {  
      const element = item.closest('.element');
      element.remove();
    }; 

    function openImage(item) {  
      const element = item.closest('.element');
      const image = element.querySelector('.element__image');
      const titleImage = element.querySelector('.element__titletext');
      popupImage.src = image.src; 
      popupTitleImage.textContent = titleImage.textContent;
    }; 

    openEditFormModalWindowButton.addEventListener('click', function() {
      togglePopup(editFormModalWindow);
      editFormModalWindowName.value = title.textContent;
      editFormModalWindowAbout.value = subtitle.textContent;
    });
    
    openCardFormModalWindowButton.addEventListener('click', function() {
      togglePopup(cardFormModalWindow);
      cardFormModalWindowNameCard.value = '';
      cardFormModalWindowLink.value = '';
    });


    closeEditFormModalWindowButton.addEventListener('click', () => togglePopup(editFormModalWindow));
    closeCardFormModalWindowButton.addEventListener('click', () => togglePopup(cardFormModalWindow));
    closeImageModalWindowButton.addEventListener('click', () => togglePopup(imageModalWindow));

    saveEditFormModalWindowButton.addEventListener('click', formSubmitHandler);
    formName.addEventListener('submit', formSubmitHandler);
    saveEditFormModalWindowButton.addEventListener('click', () => togglePopup(editFormModalWindow));    
        
    saveCardFormModalWindowButton.addEventListener('click', formNewCard);
    formCard.addEventListener('submit', formSubmitNewCard);
    saveCardFormModalWindowButton.addEventListener('click', () => togglePopup(cardFormModalWindow));