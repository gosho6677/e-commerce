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
    async ({ email, password, rePass, imageUrl }) => {
        let errors = [];

        if (!(/^[a-zA-Z]+@[a-z]{2,}\.[a-z]{2,4}$/.test(email))) {
            errors.push('Please provide a valid email!');
        }
        if (password.length < 5) {
            errors.push('Password must be atleast 5 characters!');
        }
        if (password !== rePass) {
            errors.push('Passwords must match!');
        }
        if (!(/https?:\/\//.test(imageUrl))) {
            errors.push('Image must be a valid URL!');
        }

        if (errors.length) {
            throw new Error(errors.join('\n'));
        }

        const resp = await register({ email, password, imageUrl });
        return jwt_decode(resp.token);
    }
);

export const loginThunk = createAsyncThunk(
    'user/login',
    async ({ email, password }) => {
        let errors = [];
        if (!(/^[a-zA-Z]+@[a-z]{2,}\.[a-z]{2,4}$/.test(email))) {
            errors.push('Please provide a valid email!');
        }
        if (!password || password.length < 5) {
            errors.push('Password length must be atleast 5 characters!');
        }
        if (errors.length) {
            throw new Error(errors.join('\n'));
        }
        const resp = await login({ email, password });
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
        loginOnReload: (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        },
        forcedLogout: state => {
            state.status = 'idle';
            state.user = null;
        },
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
                state.error = action.error.message;
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

export const selectUserId = state => {
    if (state.user.status === 'succeeded') {
        return state.user.user._id;
    }
};

export const { loginOnReload, forcedLogout, removeUserError } = authSlice.actions;
export default authSlice.reducer;
