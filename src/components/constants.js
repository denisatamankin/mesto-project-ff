export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21',
    headers: {
        authorization: ' c6362043-f590-45f1-bd8d-ce03cdfd9a11',
        'Content-Type': 'application/json'
      }
};

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    errorPopupSelector: '.popup__error',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

export const cardTemplate = document.querySelector('#card-template').content;

export const cardsContainer = document.querySelector('.places__list');
export const popups = document.querySelectorAll('.popup');
export const formSelector = document.querySelector('.popup__form');
export const avatar = document.querySelector(".profile__image");

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileEditPopup = document.querySelector('.popup_type_edit');
export const inputProfileTitle = profileEditPopup.querySelector('.popup__input_type_name');
export const inputProfileDescription = profileEditPopup.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const addNewCardButton = document.querySelector('.profile__add-button');
export const newCardPopup = document.querySelector('.popup_type_new-card');
export const newCardForm = document.querySelector('[name="new-place"]');
export const newCardPopupTextInput = document.querySelector('.popup__input_type_card-name');
export const newCardPopupUrlInput = document.querySelector('.popup__input_type_url');

export const cardImagePopup = document.querySelector('.popup_type_image');
export const popupImage = cardImagePopup.querySelector('.popup__image');
export const popupImageCaption = cardImagePopup.querySelector('.popup__caption');

export const avatarForm = document.querySelector('[name="avatar"]');
export const avatarImage = document.querySelector('.profile__image');
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const avatarPopupUrlInput = document.querySelector('.popup__input_type_url-avatar');

