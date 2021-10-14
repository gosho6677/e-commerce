import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteFromCart, getCart } from './cartAPI';

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
    async (body, { getState }) => {
        let { cartId, productId, quantity } = body;

        if (!cartId || !productId || !quantity) {
            throw new Error('All data is required!');
        }

        let cartState = getState().cart.cart;
        let isPresent = cartState.items.findIndex(x => x.product._id === productId);

        if (isPresent !== -1) {
            return { isPresent: true };
        }

        const resp = await addToCart(cartId, productId, quantity);

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return resp.cart;
    }
);

export const removeFromCartThunk = createAsyncThunk(
    'cart/remove',
    async (body) => {
        let { cartId, productId } = body;
        if (!cartId || !productId) {
            throw new Error('All data is required!');
        }

        const resp = await deleteFromCart(cartId, productId);
        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return resp.productId;
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

                if(action.payload.isPresent) {
                    return;
                }

                state.cart = action.payload;
            })
            .addCase(addToCartThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(removeFromCartThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(removeFromCartThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const item = state.cart.items.find(x => x.product._id === action.payload);
                state.cart.bill -= Number(item.product.price * item.quantity);
                state.cart.items = state.cart.items.filter(x => x.product._id !== action.payload);
            })
            .addCase(removeFromCartThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });
    }
});

export const selectCartId = (state) => {
    if (state.cart.status === 'succeeded') {
        return state.cart.cart._id;
    }
};

export const {
    removeCartError,
    increaseItemQuantity,
    decreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
