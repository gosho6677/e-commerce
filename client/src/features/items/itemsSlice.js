import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { createItem, deleteItem, getAllItems } from "./itemsAPI";

const itemsAdapter = createEntityAdapter({
    selectId: (book) => book._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
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
            let entities = state.entities;
            if (action.payload === 'lowestPrice') {
                state.ids.sort((a, b) => {
                    return entities[a].price - entities[b].price;
                });
            } else if (action.payload === 'highestPrice') {
                state.ids.sort((a, b) => {
                    return entities[b].price - entities[a].price;
                });
            } else if (action.payload === 'name') {
                state.ids.sort((a, b) => {
                    return entities[a].name.localeCompare(entities[b].name);
                });
            } else {
                return;
            }
        },
        removeItemError: state => {
            state.status = state.ids.length ? 'succeeded' : 'idle';
            state.error = '';
        },
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
export const { sortByAction, removeItemError } = itemsSlice.actions;
export default itemsSlice.reducer;