import './styles/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup, closePopupEsc} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUser, updateUser, getCards, addNewCard, updateAvatar} from './components/api.js';

const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const formSelector = document.querySelector('.popup__form');
const avatar = document.querySelector(".profile__image");

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const inputProfileTitle = profileEditPopup.querySelector('.popup__input_type_name');
const inputProfileDescription = profileEditPopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const addNewCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('[name="new-place"]');
const newCardPopupTextInput = document.querySelector('.popup__input_type_card-name');
const newCardPopupUrlInput = document.querySelector('.popup__input_type_url');

const cardImagePopup = document.querySelector('.popup_type_image');
const popupImage = cardImagePopup.querySelector('.popup__image');
const popupImageCaption = cardImagePopup.querySelector('.popup__caption');

const avatarForm = document.querySelector('[name="avatar"]');
const avatarImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarPopupUrlInput = document.querySelector('.popup__input_type_url-avatar');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

Promise.all([getUser(), getCards()])
    .then(([data, cards]) => {
        avatar.style.backgroundImage = `url(${data.avatar})`;
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        const userId = data._id;
        cards.forEach((card) => {
          cardsContainer.append(
            createCard(card, deleteCard, openImage, likeCard, userId)
          );
        });
    })
    .catch((err) => {
        console.error('Ошибка:', err);
    });

profileEditButton.addEventListener('click', function() {
    openPopup(profileEditPopup);
    inputProfileTitle.value = profileTitle.textContent;
    inputProfileDescription.value = profileDescription.textContent;
    clearValidation(formSelector);
}); 

addNewCardButton.addEventListener('click', function() {
    openPopup(newCardPopup);
    newCardForm.reset();
    clearValidation(formSelector);
});

avatarImage.addEventListener('click', function() {
    openPopup(avatarPopup);
    avatarForm.reset();
    clearValidation(formSelector);
});

popups.forEach(function(popup) {
    popup.addEventListener('click', function(event) {
        if(event.target.classList.contains('popup__close')|| event.target.classList.contains('popup')) {
            closePopup(popup);
        }
    })
})

function handleProfileFormSubmit(event) {
    event.preventDefault();
    const title = inputProfileTitle.value;
    const description = inputProfileDescription.value;
    event.submitter.textContent = 'Сохранение...';
    updateUser(title, description)
        .then(function() {
            profileTitle.textContent = title;
            profileDescription.textContent = description;
            closePopup(profileEditPopup);
        })
        .catch(function(error) {
            console.log(error);            
        })
        .finally(function() {
            event.submitter.textContent = 'Сохранить';
        })
};

profileEditPopup.addEventListener('submit', handleProfileFormSubmit);

function handleNewCardSubmit(event) {
    event.preventDefault();
    const name = newCardPopupTextInput.value;
    const link = newCardPopupUrlInput.value;
    event.submitter.textContent = 'Сохранение...';
    addNewCard(name, link)
        .then(function(card) {
            cardsContainer.prepend(
                createCard(card, deleteCard, openImage, likeCard)
            );
            closePopup(newCardPopup);
        })
        .catch(function(error) {
            console.log(error);            
        })
        .finally(function() {
            event.submitter.textContent = 'Сохранить';
        })
}; 

newCardPopup.addEventListener('submit', handleNewCardSubmit);

function handleAvatarSubmit(event) {
    event.preventDefault();
    const avatarLink = avatarPopupUrlInput.value;
    event.submitter.textContent = 'Сохранение...';
    updateAvatar(avatarLink)
        .then(function() {
            avatar.style.backgroundImage = `url(${avatarLink})`;
            closePopup(avatarPopup);
        })
        .catch(function(error) {
            console.log(error);            
        })
        .finally(function() {
            event.submitter.textContent = 'Сохранить';
        })
};

avatarPopup.addEventListener('submit', handleAvatarSubmit);

function openImage(card) {    
    popupImage.src = card.link;
    popupImage.alt = card.name;    
    popupImageCaption.textContent = card.name;    
    openPopup(cardImagePopup);
};    

enableValidation(validationConfig);