import { token } from '../auth/authAPI';

const baseUrl = 'http://localhost:5000/cart';

export const getCart = async () => {
    return fetch(baseUrl, {
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json());
};

export const addToCart = async (cartId, productOwner, productId, quantity) => {
    return fetch(`${baseUrl}/${cartId}/add-item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ productId, productOwner, quantity })
    })
        .then(res => res.json());
};

export const deleteFromCart = async (cartId, productId) => {
    return fetch(`${baseUrl}/${cartId}/delete-item/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => res.json());
};