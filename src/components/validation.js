import { validationConfig } from "./constants.js";

export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach(function(formSelector) {
        formSelector.addEventListener('submit', function(event) {
            event.preventDefault();
        });
        setEventListeners(formSelector, validationConfig);
    });
};

export function clearValidation(formSelector, validationConfig) {
    const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
    const errorList = Array.from(formSelector.querySelectorAll(validationConfig.errorPopupSelector));
    const submitButtonSelector = formSelector.querySelector(validationConfig.submitButtonSelector);    

    errorList.forEach(function(errorSelector) {
        errorSelector.classList.remove(validationConfig.errorClass);
        errorSelector.textContent = '';
    });
    inputList.forEach(function(inputSelector) {
        inputSelector.classList.remove(validationConfig.inputErrorClass);
    });

    submitButtonSelector.classList.add(validationConfig.inactiveButtonClass);
    submitButtonSelector.disabled = true;
};

function setEventListeners(formSelector, validationConfig) {
    const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
    const submitButtonSelector = formSelector.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, submitButtonSelector, validationConfig);

    inputList.forEach(function(inputSelector) {
        inputSelector.addEventListener('input', function() {
            checkInputValidity(formSelector, inputSelector, validationConfig);
            toggleButtonState(inputList, submitButtonSelector, validationConfig);
        });
    });
};

function checkInputValidity(formSelector, inputSelector, validationConfig) {
    if (inputSelector.validity.patternMismatch) {
        inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
    } else {
        inputSelector.setCustomValidity("");
    }

    if (!inputSelector.validity.valid) {
        showInputError(formSelector, inputSelector, inputSelector.validationMessage, validationConfig);
    } else {
        hideInputError(formSelector, inputSelector, validationConfig);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some(function(inputSelector) {
        return !inputSelector.validity.valid;
    })
};

function showInputError(formSelector, inputSelector, errorMessage, validationConfig) {
    const errorSelector = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(validationConfig.inputErrorClass);
    errorSelector.textContent = errorMessage;
    errorSelector.classList.add(validationConfig.errorClass);
};

function hideInputError(formSelector, inputSelector, validationConfig) {
    const errorSelector = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(validationConfig.inputErrorClass);
    errorSelector.classList.remove(validationConfig.errorClass);
    errorSelector.textContent = '';
};

function toggleButtonState(inputList, submitButtonSelector, validationConfig) {
    if (hasInvalidInput(inputList)) {
      submitButtonSelector.disabled = true;
      submitButtonSelector.classList.add(validationConfig.inactiveButtonClass);
    } else {
      submitButtonSelector.disabled = false;
      submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass);
    }
};
  


