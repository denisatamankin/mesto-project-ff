export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileEditPopup = document.querySelector('.popup_type_edit');
export const addNewCardButton = document.querySelector('.profile__add-button');
export const newCardPopup = document.querySelector('.popup_type_new-card');
export const newCardForm = document.querySelector('[name="new-place"]');
export const newCardPopupTextInput = document.querySelector('.popup__input_type_card-name');
export const newCardPopupUrlInput = document.querySelector('.popup__input_type_url');
export const popups = document.querySelectorAll('.popup');
export const cardImagePopup = document.querySelector('.popup_type_image');
export const popupImage = cardImagePopup.querySelector('.popup__image');
export const popupImageCaption = cardImagePopup.querySelector('.popup__caption');
export const nameInputProfile = profileEditPopup.querySelector('.popup__input_type_name');
export const jobInputProfile = profileEditPopup.querySelector('.popup__input_type_description');

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
} 

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
} 

export function closePopupEsc(event) {
    const popupIsOpen = document.querySelector('.popup_is-opened');

    if (event.key === "Escape") {
        closePopup(popupIsOpen);
    }
}