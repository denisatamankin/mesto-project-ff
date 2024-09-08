import './styles/index.css';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup, closePopupEsc} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUser, updateUser, getCards, addNewCard, updateAvatar} from './components/api.js';
import {validationConfig,
        cardsContainer,
        popups,
        formSelector,
        avatar,
        profileEditButton,
        profileEditPopup,
        inputProfileTitle,
        inputProfileDescription,
        profileTitle,
        profileDescription,
        addNewCardButton,
        newCardPopup,
        newCardForm,
        newCardPopupTextInput,
        newCardPopupUrlInput,
        cardImagePopup,
        popupImage,
        popupImageCaption,
        avatarForm,
        avatarImage,
        avatarPopup,
        avatarPopupUrlInput,
        cardTemplate} from './components/constants.js';

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

function profileEdit() {
    openPopup(profileEditPopup);
    inputProfileTitle.value = profileTitle.textContent;
    inputProfileDescription.value = profileDescription.textContent;
    clearValidation(profileEditPopup, validationConfig);
}; 
   
profileEditButton.addEventListener('click', profileEdit); 

function addCard() {
    openPopup(newCardPopup);
    newCardForm.reset();
    clearValidation(newCardPopup, validationConfig);
};

addNewCardButton.addEventListener('click', addCard);

function avatarEdit() {
    openPopup(avatarPopup);
    avatarForm.reset();
    clearValidation(avatarPopup, validationConfig);
};

avatarImage.addEventListener('click', avatarEdit);

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
                createCard(card, deleteCard, openImage, likeCard, card.owner._id)
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