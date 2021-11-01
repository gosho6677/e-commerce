import { apiDomain } from "../../constants";
import { jsonRequest } from "../../utils/jsonRequest";

const baseUrl = `${apiDomain}/auth`;

export let token = '';

export const register = async (body) => {
    const resp = await jsonRequest(`${baseUrl}/register`, 'POST', body, false);

    if (resp.ok) {
        // bad option because it doesn't persist through browser refresh:
        // injecting the token to the variable so it can be saved in memory
        // and used wherever needed
        token = resp.token;
    } else {
        throw new Error(resp.error);
    }

    return resp;
};

export const login = async (body) => {
    // viable option to attach token to response 
    // and check if its refreshed
    // TODO: switch to localstorage or cookies for token
    // for (var pair of request.headers.entries()) {
    //     console.log(pair[0]+ ': '+ pair[1]);
    //   }
    // const resp = await request.json();
    const resp = await jsonRequest(`${baseUrl}/login`, 'POST', body, false);

    if (resp.ok) {
        token = resp.token;
    } else {
        throw new Error(resp.error);
    }
    return resp;
};

export const logout = async () => {
    const resp = await jsonRequest(`${baseUrl}/logout`, undefined, undefined, true);
    token = '';
    return resp;
};