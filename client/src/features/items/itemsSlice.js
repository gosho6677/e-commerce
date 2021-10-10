import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { createItem, getAllItems } from "./itemsAPI";

const itemsAdapter = createEntityAdapter({
    selectId: (book) => book._id,
    sortComparer: (a, b) => b.name.localeCompare(a.name)
});

const initialState = itemsAdapter.getInitialState({
    status: 'idle',
    error: ''
});

export const getAllItemsThunk = createAsyncThunk(
    'items/getAll',
    async () => {
        let resp = await getAllItems();

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return resp.products;
    }
);

export const createItemThunk = createAsyncThunk(
    'items/create',
    async (body) => {
        let { name, description, category, price, imageUrl } = body;

        if (!name || description.length < 5 || !category || price < 0 || !imageUrl.startsWith('https://')) {
            throw new Error('All fields are required!');
        }

        const resp = await createItem({ name, description, category, price, imageUrl });

        if (!resp.ok) {
            throw new Error(resp.error);
        }
        return resp.product;
    }
);

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        removeItemError: state => {
            state.status = state.ids.length ? 'succeeded' : 'idle';
            state.error = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createItemThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(createItemThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                itemsAdapter.addOne(state, action.payload);
            })
            .addCase(createItemThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(getAllItemsThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(getAllItemsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                itemsAdapter.setMany(state, action.payload);
            })
            .addCase(getAllItemsThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });
    }
});

export const {
    selectAll: selectAllItems,
    selectById: selectPostById,
} = itemsAdapter.getSelectors((state) => state.items);
export const { removeItemError } = itemsSlice.actions;
export default itemsSlice.reducer;