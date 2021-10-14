import { token } from '../auth/authAPI';

const baseUrl = 'http://localhost:5000/orders';

export const getOrders = () => {
    return fetch(baseUrl, {
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json());
};

export const createOrder = (cartId, order) => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ cartId, order })
    })
        .then(res => res.json());
};
