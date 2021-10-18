import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from './authAPI';
import jwt_decode from 'jwt-decode';

const initialState = {
    user: null,
    status: 'idle',
    error: '',
};

export const registerThunk = createAsyncThunk(
    'user/register',
    async (userDetails) => {
        let { email, password, rePass, imageUrl } = userDetails;
        if (!email || !password) {
            throw new Error('All fields are required!');
        }
        if (password !== rePass) {
            throw new Error('Passwords must match!');
        }

        const resp = await register({ email, password, imageUrl });
        return jwt_decode(resp.token);
    }
);

export const loginThunk = createAsyncThunk(
    'user/login',
    async (userDetails) => {
        let { email, password } = userDetails;
        if (!email || !password) {
            throw new Error('All fields are required!');
        }

        const resp = await login(userDetails);
        return jwt_decode(resp.token);
    }
);

export const logoutThunk = createAsyncThunk(
    'user/logout',
    async () => {
        await logout();
        return true;
    }
);

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUserError: state => {
            state.status = state.user !== null ? 'succeeded' : 'idle';
            state.error = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(loginThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = 'Invalid credentials!';
            });

        builder
            .addCase(logoutThunk.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'idle';
                    state.user = null;
                }
            });
    }
});

export const { removeUserError } = authSlice.actions;
export default authSlice.reducer;
