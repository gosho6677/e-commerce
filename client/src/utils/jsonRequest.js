import { getAccessToken, setAccessToken, getRefreshToken } from "./tokenService";
import { apiDomain } from "../constants";

export async function jsonRequest(url, method, body, isAuthorized) {
    if (method === undefined) {
        method = 'GET';
    }

    let headers = {};
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        headers['Content-Type'] = 'application/json';
    }

    if (isAuthorized) {
        headers['Authorization'] = getAccessToken();
    }

    let options = {
        headers,
        method
    };

    if (body !== undefined) {
        options.body = JSON.stringify(body);
    }

    let response = await fetch(url, options);

    let result = await response.json();

    if (!result.ok && result.error === 'Access token expired!') {
        let resp = await fetch(`${apiDomain}/auth/refresh`, {
            headers: {
                'X-Authorization': getRefreshToken()
            }
        });
        let response = await resp.json();
        if(!response.ok) {
            throw new Error(response.error);
        }
        // save the new access token
        setAccessToken(response.token);
        // recurse now with fresh access token
        // with hopes that I didn't make a scenario with infinite loop
        return jsonRequest(url, method, body, isAuthorized);
    }

    return result;
}