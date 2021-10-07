const baseUrl = 'http://localhost:5000/auth';

export let token = '';

export const register = async (body) => {
    const request = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const resp = await request.json();

    if (resp.ok) {
        // injecting the token to the variable so it can be saved in memory
        // and used wherever needed
        token = resp.token;
    }

    return resp;
};

export const login = async (body) => {
    const request = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const resp = await request.json();

    if (resp.ok) {
        token = resp.token;
    }

    return resp;
};

export const logout = async () => {
    const url = `${baseUrl}/logout`;
    const response = await fetch(url, {
        headers: {
            'Authorization': token
        }
    });
    token = '';
    return response.json();
};