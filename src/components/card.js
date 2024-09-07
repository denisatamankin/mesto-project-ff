import {addLike, removeLike, deleteCardRequest} from "./api.js";

export function createCard(card, deleteCard, openImage, likeCard, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    cardElement.querySelector('.card__title').textContent = card.name;
  
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    const deleteButton = cardElement.querySelector('.card__delete-button');

    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
  
    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    
    if (userId === card.owner._id) {
        deleteButton.addEventListener("click", function() {
            deleteCard(card._id, cardElement)
        });
    } else deleteButton.remove();
    
    likeCount.textContent = card.likes.length;
   
    likeButton.addEventListener('click', function() {likeCard(card._id, likeButton, likeCount)});

    if (card.likes.some((user) => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
  
    cardImage.addEventListener('click', function() {openImage(card)});

    return cardElement;
};
  
export function deleteCard(cardId, card) {
    deleteCardRequest(cardId)
        .then(function() {
            card.remove();
        })
        .catch(function(error) {
            console.log(error);                
        });
};

export function likeCard(cardId, likeButton, likeCount) {
    if(!likeButton.classList.contains('card__like-button_is-active')) {
        addLike(cardId)
            .then(function(card) {
                likeCount.textContent = card.likes.length;
                likeButton.classList.add('card__like-button_is-active');
            })
            .catch(function(error) {
                console.log(error);                
            });
    } else {
        removeLike(cardId)
            .then(function(card) {
                likeCount.textContent = card.likes.length;
                likeButton.classList.remove('card__like-button_is-active');
            })
    }
};
