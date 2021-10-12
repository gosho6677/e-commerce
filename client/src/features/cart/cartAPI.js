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