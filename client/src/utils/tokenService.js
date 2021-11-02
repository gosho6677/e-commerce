export const getAccessToken = () => localStorage.getItem('token');
export const setAccessToken = (val) => localStorage.setItem('token', val);
export const delAccessToken = () => localStorage.removeItem('token');

export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const setRefreshToken = (val) => localStorage.setItem('refreshToken', val);
export const delRefreshToken = () => localStorage.removeItem('refreshToken');