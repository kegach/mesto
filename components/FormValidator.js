export default class FormValidator {
  constructor(data, formSelector) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = document.querySelector(formSelector);
  }

  _showInputError(inputElement) {
    inputElement.classList.add(`${this._inputErrorClass}`);
    this._form.querySelector(`#${inputElement.id}-error`).textContent =
      inputElement.validationMessage;
    this._form
      .querySelector(`#${inputElement.id}-error`)
      .classList.add(`${this._errorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid === false) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const _inputList = Array.from(
      this._form.querySelectorAll(`.${this._inputSelector}`)
    );
    const _buttonElement = this._form.querySelector(
      `.${this._submitButtonSelector}`
    );

    _inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement),
          this._toggleButtonState(_buttonElement);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", function (evt)  {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _hasInvalidInput() {
    const _inputList = Array.from(
      this._form.querySelectorAll(`.${this._inputSelector}`)
    );
    return _inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(_buttonElement) {
    if (this._hasInvalidInput() === true) {
      _buttonElement.classList.add(`${this._inactiveButtonClass}`);
      _buttonElement.setAttribute("disabled", "disabled");
    } else {
      _buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      _buttonElement.removeAttribute("disabled", "disabled");
    }
  }
}

