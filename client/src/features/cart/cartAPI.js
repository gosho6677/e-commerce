import { apiDomain } from '../../constants';
import { jsonRequest } from '../../utils/jsonRequest';

const baseUrl = `${apiDomain}/cart`;

export const getCart = async () => {
    return await jsonRequest(baseUrl, undefined, undefined, true);
};

export const addToCart = async (cartId, productOwner, productId, quantity) => {
    return await jsonRequest(
        `${baseUrl}/${cartId}/add-item`,
        'POST',
        { productId, productOwner, quantity },
        true
    );
};

export const deleteFromCart = async (cartId, productId) => {
    return await jsonRequest(
        `${baseUrl}/${cartId}/delete-item/${productId}`,
        'DELETE',
        undefined,
        true
    );
};