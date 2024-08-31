export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
} 

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
} 

export function closePopupEsc(event) {

    if (event.key === "Escape") {
        const popupIsOpen = document.querySelector('.popup_is-opened');

        closePopup(popupIsOpen);
    }
}