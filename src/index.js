import './styles/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup, closePopupEsc} from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('[name="new-place"]');
const newCardPopupTextInput = document.querySelector('.popup__input_type_card-name');
const newCardPopupUrlInput = document.querySelector('.popup__input_type_url');
const popups = document.querySelectorAll('.popup');
const cardImagePopup = document.querySelector('.popup_type_image');
const popupImage = cardImagePopup.querySelector('.popup__image');
const popupImageCaption = cardImagePopup.querySelector('.popup__caption');
const nameInputProfile = profileEditPopup.querySelector('.popup__input_type_name');
const jobInputProfile = profileEditPopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

initialCards.forEach(function(card) {
    const cardElement = createCard(card, deleteCard, openImage, likeCard);
    cardsContainer.append(cardElement);
});

profileEditButton.addEventListener('click', function() {
    openPopup(profileEditPopup);
    nameInputProfile.value = profileTitle.textContent;
    jobInputProfile.value = profileDescription.textContent;
}); 

addNewCardButton.addEventListener('click', function() {
    openPopup(newCardPopup);
    newCardForm.reset();
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
    profileTitle.textContent = nameInputProfile.value;
    profileDescription.textContent = jobInputProfile.value;
    closePopup(profileEditPopup);
};

profileEditPopup.addEventListener('submit', handleProfileFormSubmit);

function handleNewCardSubmit(event) {
    event.preventDefault();
    const newCard = {name: newCardPopupTextInput.value,
         link: newCardPopupUrlInput.value};
    const addNewCard = createCard(newCard, deleteCard, openImage, likeCard);
    cardsContainer.prepend(addNewCard);
    closePopup(newCardPopup);
} 

newCardPopup.addEventListener('submit', handleNewCardSubmit);

function openImage(card) {    
    popupImage.src = card.link;
    popupImage.alt = card.name;    
    popupImageCaption.textContent = card.name;    
    openPopup(cardImagePopup);
};    
