// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

function createCard(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = card.name;

    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = card.link;
    cardImage.alt = card.name;

    const deleteButton = cardElement.querySelector(".card__delete-button");

    deleteButton.addEventListener('click',function() {deleteCard(deleteElement)});
    const deleteElement = deleteButton.closest('.card');
    
    return cardElement;
};

function deleteCard(deleteElement) {
    deleteElement.remove();
};

initialCards.forEach(function(card) {
    const cardElement = createCard(card, deleteCard);
    cardContainer.append(cardElement);
});

