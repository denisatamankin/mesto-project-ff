export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(function(formSelector) {
        formSelector.addEventListener('submit', function(event) {
            event.preventDefault();
        });
        setEventListeners(formSelector);
    });
};


export function clearValidation(formSelector) {
    const inputList = Array.from(document.querySelectorAll('.popup__input'));
    const errorList = Array.from(document.querySelectorAll('.popup__error'));
    const submitButtonSelector = formSelector.querySelector('.popup__button')
    errorList.forEach(function(errorSelector) {
        errorSelector.classList.remove('popup__error_visible');
        errorSelector.textContent = '';
    });
    inputList.forEach(function(inputSelector) {
        inputSelector.classList.remove('popup__input_type_error');
    });
    toggleButtonState(inputList, submitButtonSelector);   
}

function setEventListeners(formSelector) {
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
    const submitButtonSelector = formSelector.querySelector('.popup__button');

    toggleButtonState(inputList, submitButtonSelector);

    inputList.forEach(function(inputSelector) {
        inputSelector.addEventListener('input', function() {
            checkInputValidity(formSelector, inputSelector);
            toggleButtonState(inputList, submitButtonSelector);
        });
    });
};

function checkInputValidity(formSelector, inputSelector) {
    if (inputSelector.validity.patternMismatch) {
        inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
    } else {
        inputSelector.setCustomValidity("");
    }

    if (!inputSelector.validity.valid) {
        showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
        hideInputError(formSelector, inputSelector);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some(function(inputSelector) {
        return !inputSelector.validity.valid;
    })
};

function showInputError(formSelector, inputSelector, errorMessage) {
    const errorSelector = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add('popup__input_type_error');
    errorSelector.textContent = errorMessage;
    errorSelector.classList.add('popup__error_visible');
};

function hideInputError(formSelector, inputSelector) {
    const errorSelector = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove('popup__input_type_error');
    errorSelector.classList.remove('popup__error_visible');
    errorSelector.textContent = '';
};

function toggleButtonState(inputList, submitButtonSelector) {
    if (hasInvalidInput(inputList)) {
      submitButtonSelector.disabled = true;
      submitButtonSelector.classList.add('popup__button_disabled');
    } else {
      submitButtonSelector.disabled = false;
      submitButtonSelector.classList.remove('popup__button_disabled');
    }
};
  


