import {openImage} from '../index.js';

export const cardTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');

export function createCard(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    cardElement.querySelector('.card__title').textContent = card.name;
  
    const cardImage = cardElement.querySelector('.card__image');
  
    cardImage.src = card.link;
    cardImage.alt = card.name;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    deleteButton.addEventListener('click',function() {deleteCard(cardElement)});

    const likeButton = cardElement.querySelector('.card__like-button');
   
    likeButton.addEventListener('click', function() {likeCard(likeButton)});
  
    cardImage.addEventListener('click', function() {openImage(card)});

    return cardElement;
};
  
export function deleteCard(cardElement) {
    cardElement.remove();
};

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
};
