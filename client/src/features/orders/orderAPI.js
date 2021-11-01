import { apiDomain } from '../../constants';
import { jsonRequest } from '../../utils/jsonRequest';

const baseUrl = `${apiDomain}/orders`;

export const getOrders = () => {
    return jsonRequest(baseUrl, undefined, undefined, true);
};

export const createOrder = (cartId, order) => {
    return jsonRequest(baseUrl, 'POST', { cartId, order }, true);
};
