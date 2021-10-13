import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, getCart } from './cartAPI';

const initialState = {
    cart: null,
    status: 'idle',
    error: '',
};

export const getCartThunk = createAsyncThunk(
    'cart/get',
    async () => {
        const resp = await getCart();
        if (!resp.ok) {
            throw new Error(resp.error);
        }
        return resp.cart;
    }
);

export const addToCartThunk = createAsyncThunk(
    'cart/add',
    async (body) => {
        let { cartId, productId, quantity } = body;

        if (!cartId || !productId || !quantity) {
            throw new Error('All data is required!');
        }

        const resp = await addToCart(cartId, productId, quantity);

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return resp.cart;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeCartError: state => {
            state.status = state.cart !== null ? 'succeeded' : 'idle';
            state.error = '';
        },
        increaseItemQuantity: (state, action) => {
            // console.log(JSON.stringify(state.cart, null , 2));
            const item = state.cart.items.find(x => x.product._id === action.payload);
            if (!item) {
                return;
            }

            item.quantity += 1;
            state.cart.bill += Number(item.product.price);
        },
        decreaseItemQuantity: (state, action) => {
            const item = state.cart.items.find(x => x.product._id === action.payload);
            if (!item) {
                return;
            }
            if (item.quantity > 1 && (state.cart.bill - item.product.price) > 0) {
                item.quantity -= 1;
                state.cart.bill -= Number(item.product.price);
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCartThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(getCartThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload;
            })
            .addCase(getCartThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(addToCartThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(addToCartThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload;
            })
            .addCase(addToCartThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });
    }
});

export const {
    removeCartError,
    increaseItemQuantity,
    decreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
