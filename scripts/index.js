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

    const openModal1Button = document.querySelector('.profile__editbutton');
    const openModal2Button = document.querySelector('.profile__addbutton');
        
    const modal1 = document.querySelector('.popup_type_edit');
    const modal2 = document.querySelector('.popup_type_add');
    const modal3 = document.querySelector('.popup_type_image');
    const closeModal1Button = modal1.querySelector('.popup__closebutton');
    const closeModal2Button = modal2.querySelector('.popup__closebutton');
    const closeModal3Button = modal3.querySelector('.popup__closebutton');
    const saveModal1Button = modal1.querySelector('.popup__savebutton');
    const saveModal2Button = modal2.querySelector('.popup__savebutton');

    const form1= modal1.querySelector('.popup__container');
    const form2 = modal2.querySelector('.popup__container');

    let modal1Name = modal1.querySelector('.popup__firstline');
    let modal1About = modal1.querySelector('.popup__secondline');
    let modal2NameCard = modal2.querySelector('.popup__firstline');
    let modal2Link = modal2.querySelector('.popup__secondline');

    let title = document.querySelector('.profile__author');
    let subtitle = document.querySelector('.profile__profession');
    
    const images = document.querySelectorAll('.element__image');
    let popupImage = modal3.querySelector('.popup__image');
    let popupTitleImage = modal3.querySelector('.popup__titleimage');

    const elementlikes = document.querySelectorAll('.element__group');
    const elementdeletes = document.querySelectorAll('.element__delete'); 
     
    elementlikes.forEach(function(item){
      item.addEventListener('click', () => toggleLike(item));
    }); 

    elementdeletes.forEach(function(item){
      item.addEventListener('click', () => toggleDelete(item));
    }); 

    images.forEach(function(item){
      item.addEventListener('click', () => togglePopup(modal3));
      item.addEventListener('click', () => openImage(item));
    }); 
    
    function togglePopup(mod = '') {
      mod.classList.toggle('popup_opened'); 
      if (mod === modal1) {
        modal1Name.value = title.textContent;
        modal1About.value = subtitle.textContent;
      };
      if (mod === modal2) {
        modal2NameCard.value = '';
        modal2Link.value = '';
      }
    }; 

    function formSubmitHandler (evt) {
      evt.preventDefault(); 
      title.textContent = modal1Name.value;
      subtitle.textContent = modal1About.value;
    }; 

    function createCards(cardName, cardLink){
      const elements = document.querySelector('.elements');
      const template = document.querySelector('#temp').content;
      const element = template.cloneNode(true);        
      element.querySelector('.element__titletext').textContent = cardName;
      element.querySelector('.element__image').src = cardLink;
      elements.append(element);  
    };

    function formNewCard (evt){
      evt.preventDefault(); 
      const elements = document.querySelector('.elements');
      const template = document.querySelector('#temp').content;
      const element = template.cloneNode(true);  
      element.querySelector('.element__image').src = modal2Link.value;
      element.querySelector('.element__titletext').textContent = modal2NameCard.value;
      const like = element.querySelector('.element__group');
      like.addEventListener('click', () => toggleLike(like));
      const deleteCard = element.querySelector('.element__delete');
      deleteCard.addEventListener('click', () => toggleDelete(deleteCard));
      const imageCard = element.querySelector('.element__image');
      imageCard.addEventListener('click', () => togglePopup(modal3));
      imageCard.addEventListener('click', () => openImage(imageCard));
      elements.prepend(element);
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

    openModal1Button.addEventListener('click', () => togglePopup(modal1));
    openModal2Button.addEventListener('click', () => togglePopup(modal2));
    closeModal1Button.addEventListener('click', () => togglePopup(modal1));
    closeModal2Button.addEventListener('click', () => togglePopup(modal2));
    closeModal3Button.addEventListener('click', () => togglePopup(modal3));

    saveModal1Button.addEventListener('click', formSubmitHandler);
    form1.addEventListener('submit', formSubmitHandler);
    saveModal1Button.addEventListener('click', () => togglePopup(modal1));    
        
    saveModal2Button.addEventListener('click', formNewCard);
    form2.addEventListener('submit', formNewCard);
    saveModal2Button.addEventListener('click', () => togglePopup(modal2));