

  const showInputError = (obj, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(`${obj.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${obj.errorClass}`);
  };
  
  const hideInputError = (obj,formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(`${obj.inputErrorClass}`);
    errorElement.classList.remove(`${obj.errorClass}`);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (obj, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(obj, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(obj, formElement, inputElement);
    }
  };
  
  const setEventListeners = (obj, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`.${obj.inputSelector}`));
    const buttonElement = formElement.querySelector(`.${obj.submitButtonSelector}`);
    const stopElement = formElement.querySelector('.popup__cross-button');
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(obj, formElement, inputElement);
        toggleButtonState(obj, inputList, buttonElement);
      stopElement.addEventListener('click', function () {
        hideInputError(obj, formElement, inputElement);
        buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
        formElement.reset();
      })
      });
    });
  };
  
  const enableValidation = (obj) => {
    const formList = Array.from(document.getElementsByTagName(`${obj.formSelector}`));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });        
      setEventListeners(obj, formElement);
    });         
  };

  enableValidation({
    formSelector: 'form',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
  });
  
   function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
   }
  
  function toggleButtonState(obj, inputList, buttonElement) {
    if(hasInvalidInput(inputList) === true) {
      buttonElement.classList.add(`${obj.inactiveButtonClass}`);
    }
    else {
      buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
    }
  }
