import { apiDomain } from "../../constants";
import { jsonRequest } from "../../utils/jsonRequest";
import { setAccessToken, setRefreshToken, delAccessToken, delRefreshToken } from '../../utils/tokenService';

const baseUrl = `${apiDomain}/auth`;

export const register = async (body) => {
    const resp = await jsonRequest(`${baseUrl}/register`, 'POST', body, false);

    if (resp.ok) {
        setAccessToken(resp.token);
        setRefreshToken(resp.refreshToken);
    } else {
        throw new Error(resp.error);
    }

    return resp;
};

export const login = async (body) => {
    const resp = await jsonRequest(`${baseUrl}/login`, 'POST', body, false);

    if (resp.ok) {
        setAccessToken(resp.token);
        setRefreshToken(resp.refreshToken);
    } else {
        throw new Error(resp.error);
    }
    return resp;
};

export const logout = async () => {
    const resp = await jsonRequest(`${baseUrl}/logout`, undefined, undefined, true);
    delAccessToken();
    delRefreshToken();
    
    return resp;
};