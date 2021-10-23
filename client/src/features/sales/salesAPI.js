import { apiDomain } from "../../constants";
import { token } from '../auth/authAPI';

let baseUrl = `${apiDomain}/sales`;

export const getAllUserSales = () => {
    return fetch(baseUrl, {
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json());
};