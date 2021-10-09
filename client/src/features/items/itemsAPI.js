import { token } from '../auth/authAPI';

const baseUrl = 'http://localhost:5000/products';

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