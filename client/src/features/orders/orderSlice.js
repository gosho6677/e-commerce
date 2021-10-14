import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, getOrders } from './orderAPI';

const initialState = {
    orders: [],
    status: 'idle',
    error: '',
};

export const getOrdersThunk = createAsyncThunk(
    'orders/get',
    async () => {
        const resp = await getOrders();

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return resp.orders;
    }
);

export const createOrderThunk = createAsyncThunk(
    'orders/create',
    async (body) => {
        let { cartId, order } = body;

        if (!cartId || !order) {
            throw new Error('All data is required!');
        }
        const resp = await createOrder(cartId, order);

        if (!resp.ok) {
            throw new Error(resp.error);
        }
        // return true if successful creation
        // since the plan for now is to fetch orders only when user  
        // redirects to my orders
        return true;
    }
);

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        removeOrderError: state => {
            state.status = state.orders.length ? 'succeeded' : 'idle';
            state.error = '';
        }
    },
    extraReducers: builder => {
        // builder
        //     .addCase(getCartThunk.pending, state => {
        //         state.status = 'loading';
        //     })
        //     .addCase(getCartThunk.fulfilled, (state, action) => {
        //         state.status = 'succeeded';
        //         state.cart = action.payload;
        //     })
        //     .addCase(getCartThunk.rejected, (state, action) => {
        //         state.status = 'error';
        //         state.error = action.error.message || '';
        //     });
    }
});

export const selectCartId = (state) => {
    if (state.cart.status === 'succeeded') {
        return state.cart.cart._id;
    }
};

export const selectCartItems = (state) => {
    if (state.cart.status === 'succeeded') {
        return state.cart.cart.items;
    }
};

export const {
    removeOrderError,
} = orderSlice.actions;
export default orderSlice.reducer;
