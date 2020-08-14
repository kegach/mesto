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

        let openModal1Button = document.querySelector('.profile__editbutton');
        let openModal2Button = document.querySelector('.profile__addbutton');
        

        let modal1 = document.getElementById('modal1');
        let modal2 = document.getElementById('modal2');
        let modal3 = document.getElementById('modal3');
        let closeModal1Button = modal1.querySelector('.popup__closebutton');
        let closeModal2Button = modal2.querySelector('.popup__closebutton');
        let closeModal3Button = modal3.querySelector('.popup__closebutton');
        let saveModal1Button = modal1.querySelector('.popup__savebutton');
        let saveModal2Button = modal2.querySelector('.popup__savebutton');

        let form1= modal1.querySelector('.popup__container');
        let form2 = modal2.querySelector('.popup__container');

        let modal1Name = modal1.querySelector('.popup__firstline');
        let modal1About = modal1.querySelector('.popup__secondline');
        let modal2NameCard = modal2.querySelector('.popup__firstline');
        let modal2Link = modal2.querySelector('.popup__secondline');

        let title = document.querySelector('.profile__author');
        let subtitle = document.querySelector('.profile__profession');
        
 

        let card = initialCards.forEach( function(item){ 
            createCard(item.name, item.link); 
            function createCard(cardName, cardLink){
              const elements = document.querySelector('.elements');
              const template = document.querySelector('#temp').content;
              const element = template.cloneNode(true);        
              element.querySelector('.element__titletext').textContent = cardName;
              element.querySelector('.element__image').src = cardLink;
              elements.append(element);  
            };
        });
            
           /* elementCardCopy.querySelector('.elements__like').addeventListener(click, function (evt) { 
      evt.target.classList.toggle('.') 
    };*/ 
           


        function formNewCard (){
          const elements = document.querySelector('.elements');
          const template = document.querySelector('#temp').content;
          const element = template.cloneNode(true);  
          element.querySelector('.element__image').src = modal2Link.value;
          element.querySelector('.element__titletext').textContent = modal2NameCard.value;
          elements.prepend(element);
           
        };

        form2.addEventListener('submit', formNewCard);
        saveModal2Button.addEventListener('click', formNewCard);
        saveModal2Button.addEventListener('click', () => togglePopup(modal2));


      let deleteBut = document.querySelector('.element__delete');



      let elementlikes = document.querySelectorAll('.element__group');
      let elementdeletes = document.querySelectorAll('.element__delete');
      
      elementlikes.forEach(function(item){
          item.addEventListener('click', toggleLike);
          function toggleLike() {
            const element = item.closest('.element');
            const like = element.querySelector('.element__like');
            like.classList.toggle('element__like_white');
            like.classList.toggle('element__like_black');
            console.log('Лайкнул');  
          }; 
      }); 

     elementdeletes.forEach(function(item){
          item.addEventListener('click', toggleDelete);
          function toggleDelete() {  
            const element = item.closest('.element');
            element.remove();
            console.log('Удалил');
          }; 
      }); 

      let images = document.querySelectorAll('.element__image');
      let popupImage = modal3.querySelector('.popup__image');
      let popupTitleImage = modal3.querySelector('.popup__titleimage')
      
      images.forEach(function(item){
        item.addEventListener('click', () => togglePopup(modal3));
        item.addEventListener('click', togglePopup3);
        function togglePopup3() {  
          const element = item.closest('.element');
          const image = element.querySelector('.element__image');
          const titleImage = element.querySelector('.element__titletext');
          popupImage.src = image.src; 
          popupTitleImage.textContent = titleImage.textContent;
        }; 
      }); 
   
        function togglePopup(mod = '') {
            mod.classList.toggle('popup_opened');
            console.log('Мы открыли/закрыли окно');  
            if (mod === modal1) {
              modal1Name.value = title.textContent;
              modal1About.value = subtitle.textContent;
            }
            if (mod === modal2) {
              modal2NameCard.value = '';
              modal2Link.value = '';
            }
        }; 

        openModal1Button.addEventListener('click', () => togglePopup(modal1));
        openModal2Button.addEventListener('click', () => togglePopup(modal2));
        closeModal1Button.addEventListener('click', () => togglePopup(modal1));
        closeModal2Button.addEventListener('click', () => togglePopup(modal2));
        closeModal3Button.addEventListener('click', () => togglePopup(modal3));
 

        

       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
  
       
       
       
       
        function formSubmitHandler (evt) {
            evt.preventDefault(); 
            title.textContent = modal1Name.value;
            subtitle.textContent = modal1About.value;
        } 
        
        saveModal1Button.addEventListener('click', formSubmitHandler);
        form1.addEventListener('submit', formSubmitHandler);
        saveModal1Button.addEventListener('click', () => togglePopup(modal1));