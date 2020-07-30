        let modal = document.querySelector('.popup');
        let openModalButton = document.querySelector('.profile__editbutton');
        let closeModalButton = document.querySelector('.popup__closebutton');

        function openClosePopup() {
            modal.classList.toggle('popup_opened');
            console.log('Мы открыли/закрыли окно'); 
        } 
        openModalButton.addEventListener('click', openClosePopup);
        closeModalButton.addEventListener('click', openClosePopup);

        let saveModalButton = document.querySelector('.popup__savebutton');

        let form = document.querySelector('.popup__container');

        function formSubmitHandler (evt) {
            evt.preventDefault(); 
            let modalName = document.querySelector('.popup__author');
            let modalAbout = document.querySelector('.popup__profession');
            let znach1 = modalName.value;
            let znach2 = modalAbout.value;
            let title = document.querySelector('.profile__author');
            let subtitle = document.querySelector('.profile__profession');
            title.textContent = znach1;
            subtitle.textContent = znach2;
        }        
        saveModalButton.addEventListener('click', formSubmitHandler);
        form.addEventListener('submit', formSubmitHandler);
        saveModalButton.addEventListener('click',openClosePopup);