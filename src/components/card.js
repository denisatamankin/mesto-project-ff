import {cardTemplate, cardsContainer, cardImagePopup, popupImage, popupImageCaption} from '../index.js';
import {openPopup,  closePopup} from './modal.js';

export function createCard(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    cardElement.querySelector('.card__title').textContent = card.name;
  
    const cardImage = cardElement.querySelector('.card__image');
  
    cardImage.src = card.link;
    cardImage.alt = card.name;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    deleteButton.addEventListener('click',function() {deleteCard(cardElement)});

    const likeButton = cardElement.querySelector('.card__like-button');

    function likeCard() {
        likeButton.classList.toggle('card__like-button_is-active');
    };
    
    likeButton.addEventListener('click', function() {likeCard()});

    function openImage(card) {    
        popupImage.src = card.link;
        popupImage.alt = card.name;    
        popupImageCaption.textContent = card.name;    
        openPopup(cardImagePopup);
    };    
    
    cardImage.addEventListener('click', function() {openImage(card)});

    return cardElement;
};
  
export function deleteCard(cardElement) {
    cardElement.remove();
};
