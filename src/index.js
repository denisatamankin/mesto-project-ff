import './styles/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard} from './components/card.js';
import {closePopup, openPopup,} from './components/modal.js';

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileEditPopup = document.querySelector('.popup_type_edit');
export const addNewCardButton = document.querySelector('.profile__add-button');
export const newCardPopup = document.querySelector('.popup_type_new-card');
export const newCardPopupTextInput = document.querySelector('.popup__input_type_card-name');
export const newCardPopupUrlInput = document.querySelector('.popup__input_type_url');
export const popups = document.querySelectorAll('.popup');
export const cardImagePopup = document.querySelector('.popup_type_image');
export const popupImage = cardImagePopup.querySelector('.popup__image');
export const popupImageCaption = cardImagePopup.querySelector('.popup__caption');

export const cardTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');

export const nameInputProfile = profileEditPopup.querySelector('.popup__input_type_name');
export const jobInputProfile = profileEditPopup.querySelector('.popup__input_type_description');

initialCards.forEach(function(card) {
    const cardElement = createCard(card, deleteCard);
    cardsContainer.append(cardElement);
});

profileEditButton.addEventListener('click', function() {
    openPopup(profileEditPopup);
    nameInputProfile.value = document.querySelector('.profile__title').textContent;
    jobInputProfile.value = document.querySelector('.profile__description').textContent;
}); 

addNewCardButton.addEventListener('click', function() {
    openPopup(newCardPopup);
    newCardPopupTextInput.value = '';
    newCardPopupUrlInput.value = '';
});

popups.forEach(function(popup) {
    popup.addEventListener('click', function(event) {
        if(event.target.classList.contains('popup__close')|| event.target.classList.contains('popup')) {
            closePopup(popup);
        }
    })
})

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closePopup(profileEditPopup);
        closePopup(newCardPopup);
        closePopup(cardImagePopup);
    }
});

function handleProfileFormSubmit(event) {
    event.preventDefault();
    document.querySelector('.profile__title').textContent = nameInputProfile.value;
    document.querySelector('.profile__description').textContent = jobInputProfile.value;
    closePopup(profileEditPopup);
};

profileEditPopup.addEventListener('submit', handleProfileFormSubmit);

function handleNewCardSubmit(event) {
    event.preventDefault();
    let newCard = {name: newCardPopupTextInput.value,
         link: newCardPopupUrlInput.value};
    const addNewCard = createCard(newCard, deleteCard);
    cardsContainer.prepend(addNewCard);
    closePopup(newCardPopup);
} 

newCardPopup.addEventListener('submit', handleNewCardSubmit);