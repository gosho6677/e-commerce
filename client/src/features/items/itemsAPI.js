import { token } from '../auth/authAPI';

const baseUrl = 'http://localhost:5000/products';

export const getAllItems = () => {
    return fetch(baseUrl).then(resp => resp.json());
};

export const createItem = (body) => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json());
};

export const editItem = (body, productId) => {
    return fetch(`${baseUrl}/edit/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json());
};

export const deleteItem = (itemId) => {
    return fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json());
};