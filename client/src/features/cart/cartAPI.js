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

export const addToCart = async (cartId, productId, quantity) => {
    return fetch(`${baseUrl}/${cartId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ productId, quantity })
    })
        .then(res => res.json());
};