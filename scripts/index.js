const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = card.name;

    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = card.link;
    cardImage.alt = card.name;

    const deleteButton = cardElement.querySelector(".card__delete-button");

    deleteButton.addEventListener('click',function() {deleteCard(cardElement)});
    
    return cardElement;
};

function deleteCard(cardElement) {
    cardElement.remove();
};

initialCards.forEach(function(card) {
    const cardElement = createCard(card, deleteCard);
    cardsContainer.append(cardElement);
});

