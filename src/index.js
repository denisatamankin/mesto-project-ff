import './styles/index.css';
import {initialCards, createCard, deleteCard} from './components/cards.js';

export const cardTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');

createCard();

initialCards.forEach(function(card) {
    const cardElement = createCard(card, deleteCard);
    cardsContainer.append(cardElement);
});

