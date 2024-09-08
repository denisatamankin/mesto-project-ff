import {config} from './constants.js';

function handleResponse(response) {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`)
};

export function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers,
    })
    .then(handleResponse);
};

export function updateUser(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    })
    .then(handleResponse);
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers,
    })
    .then(handleResponse);
};

export function addNewCard(name, link, userId) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            _id: userId,
            name: name,
            link: link,
        }),
    })
    .then(handleResponse);
}; 

export function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then(handleResponse); 
};

export function removeLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(handleResponse); 
};

export function deleteCardRequest(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(handleResponse); 
};

export function updateAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar,
        }),
    })
    .then(handleResponse);
}; 


