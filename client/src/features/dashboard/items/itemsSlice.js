import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import sortItems from "../../../utils/sortItems";
import { createItem, deleteItem, editItem, getAllItems } from "./itemsAPI";

const itemsAdapter = createEntityAdapter({
    selectId: (book) => book._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = itemsAdapter.getInitialState({
    status: 'idle',
    error: '',
    notification: '',
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
    async ({ name, description, category, price, imageUrl }) => {

        if (!category) {
            throw new Error('Please choose a category!');
        }

        const resp = await createItem({ name, description, category, price, imageUrl });

        if (!resp.ok) {
            throw new Error(resp.error);
        }
        return resp.product;
    }
);

export const editItemThunk = createAsyncThunk(
    'items/edit',
    async ({ name, description, category, price, imageUrl, productId }) => {

        if (!category) {
            throw new Error('Please choose a category!');
        }

        const resp = await editItem({ name, description, category, price, imageUrl }, productId);

        if (!resp.ok) {
            throw new Error(resp.error);
        }
        return resp.product;
    }
);

export const deleteItemThunk = createAsyncThunk(
    'items/delete',
    async (itemId) => {
        const resp = await deleteItem(itemId);

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return itemId;
    }
);

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        sortByAction: (state, action) => {
            sortItems[action.payload](state);
        },
        removeItemError: state => {
            state.status = state.ids.length ? 'succeeded' : 'idle';
            state.error = '';
        },
        removeNotification: state => {
            state.notification = '';
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createItemThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(createItemThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notification = 'Item created successfully!';
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

        builder
            .addCase(editItemThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(editItemThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notification = 'Edit successful!';
                itemsAdapter.updateOne(state, {
                    id: action.payload._id,
                    changes: action.payload
                });
            })
            .addCase(editItemThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(deleteItemThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                itemsAdapter.removeOne(state, action.payload);
            })
            .addCase(deleteItemThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });
    }
});

export const selectUserListings = (state) => {
    let result = [];
    if (state.user.status === 'succeeded') {
        let userId = state.user.user._id;
        state.items.ids.forEach(x => {
            let entities = state.items.entities;
            if (entities[x].creatorId === userId) {
                result.push(entities[x]);
            }
        });
    }
    return result;
};

export const {
    selectAll: selectAllItems,
    selectById: selectItemById,
    selectTotal: selectTotalItems,
} = itemsAdapter.getSelectors((state) => state.items);
export const { sortByAction, removeItemError, removeNotification } = itemsSlice.actions;
export default itemsSlice.reducer;