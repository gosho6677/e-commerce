import { apiDomain } from '../../../constants';
import { jsonRequest } from '../../../utils/jsonRequest';

const baseUrl = `${apiDomain}/products/reviews`;

export const getAllReviews = async (itemId) => {
    const url = `${baseUrl}/${itemId}`;
    return jsonRequest(url, undefined, undefined, false);
};

export const createReview = async ({ comment, reviewRating, itemId }) => {
    const url = `${baseUrl}/${itemId}`;
    return jsonRequest(url, 'POST', { comment, reviewRating }, true);
};

export const deleteReview = async (reviewId) => {
    const url = `${baseUrl}/${reviewId}`;
    return jsonRequest(url, 'DELETE', undefined, true);
};