import { apiDomain } from '../../constants';
import { jsonRequest } from '../../utils/jsonRequest';

const baseUrl = `${apiDomain}/products`;

export const getAllItems = () => {
    return jsonRequest(baseUrl, undefined, undefined, false);
};

export const createItem = (body) => {
    return jsonRequest(baseUrl, 'POST', body, true);
};

export const editItem = (body, productId) => {
    return jsonRequest(`${baseUrl}/edit/${productId}`, 'PUT', body, true);
};

export const deleteItem = (itemId) => {
    return jsonRequest(`${baseUrl}/${itemId}`, 'DELETE', undefined, true);
};