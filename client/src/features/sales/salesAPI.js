import { apiDomain } from "../../constants";
import { jsonRequest } from "../../utils/jsonRequest";

let baseUrl = `${apiDomain}/sales`;

export const getAllUserSales = () => {
    return jsonRequest(baseUrl, undefined, undefined, true);
};

export const changeSaleStatus = (saleId) => {
    return jsonRequest(`${baseUrl}/${saleId}/status`, 'PATCH', undefined, true);
};