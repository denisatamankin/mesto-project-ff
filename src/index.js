import './styles/index.css';
import {initialCards} from './components/cards.js';
import {cardsContainer, createCard, deleteCard} from './components/card.js';
import {openPopup, 
        closePopup, 
        profileEditButton, 
        profileEditPopup, 
        addNewCardButton, 
        newCardPopup, 
        newCardPopupTextInput, 
        newCardPopupUrlInput, 
        popups, 
        cardImagePopup, 
        popupImage,
        nameInputProfile,
        jobInputProfile,
        newCardForm,        
        popupImageCaption} from './components/modal.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

initialCards.forEach(function(card) {
    const cardElement = createCard(card, deleteCard);
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
    document.querySelector('.profile__title').textContent = nameInputProfile.value;
    document.querySelector('.profile__description').textContent = jobInputProfile.value;
    closePopup(profileEditPopup);
};

profileEditPopup.addEventListener('submit', handleProfileFormSubmit);

function handleNewCardSubmit(event) {
    event.preventDefault();
    const newCard = {name: newCardPopupTextInput.value,
         link: newCardPopupUrlInput.value};
    const addNewCard = createCard(newCard, deleteCard);
    cardsContainer.prepend(addNewCard);
    closePopup(newCardPopup);
} 

newCardPopup.addEventListener('submit', handleNewCardSubmit);

export function openImage(card) {    
    popupImage.src = card.link;
    popupImage.alt = card.name;    
    popupImageCaption.textContent = card.name;    
    openPopup(cardImagePopup);
};    
