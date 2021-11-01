import { token } from "../features/auth/authAPI";

export async function jsonRequest(url, method, body, isAuthorized) {
    if (method === undefined) {
        method = 'GET';
    }

    let headers = {};
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        headers['Content-Type'] = 'application/json';
    }

    if (isAuthorized) {
        headers['Authorization'] = token;
    }

    let options = {
        headers,
        method
    };

    if (body !== undefined) {
        options.body = JSON.stringify(body);
    }

    let response = await fetch(url, options);
    // if (!response.ok) {
    //     let message = await response.text();
    //     throw new Error(`${response.status}: ${response.statusText}\n${message}`);
    // }

    // let result = undefined;
    // if (!skipResult) {
    //     result = 
    // }

    return await response.json();
}