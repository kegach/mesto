        let modal = document.querySelector('.popup');
        let openModalButton = document.querySelector('.profile__editbutton');
        let closeModalButton = document.querySelector('.popup__closebutton');
        let saveModalButton = document.querySelector('.popup__savebutton');
        let form = document.querySelector('.popup__container');
        let modalName = document.querySelector('.popup__author');
        let modalAbout = document.querySelector('.popup__profession');
        let title = document.querySelector('.profile__author');
        let subtitle = document.querySelector('.profile__profession');
        
        function openClosePopup() {
            modal.classList.toggle('popup_opened');
            console.log('Мы открыли/закрыли окно'); 
            modalName.value = title.textContent;
            modalAbout.value = subtitle.textContent;
        } 

        function formSubmitHandler (evt) {
            evt.preventDefault(); 
            title.textContent = modalName.value;
            subtitle.textContent = modalAbout.value;
        } 
        
        openModalButton.addEventListener('click', openClosePopup);
        closeModalButton.addEventListener('click', openClosePopup);
        saveModalButton.addEventListener('click', formSubmitHandler);
        form.addEventListener('submit', formSubmitHandler);
        saveModalButton.addEventListener('click',openClosePopup);