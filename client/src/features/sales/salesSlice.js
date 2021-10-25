import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getAllUserSales, changeSaleStatus } from './salesAPI';

const salesAdapter = createEntityAdapter({
    selectId: (sale) => sale._id
});

const initialState = salesAdapter.getInitialState({
    status: 'idle',
    error: '',
    notification: '',
});

export const getAllUserSalesThunk = createAsyncThunk(
    'sales/get',
    async () => {
        const resp = await getAllUserSales();

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return resp.sales;
    }
);

export const changeSaleStatusThunk = createAsyncThunk(
    'sales/changeStatus',
    async (saleId) => {
        const resp = await changeSaleStatus(saleId);

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return saleId;
    }
);

export const salesSlise = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        removeSalesError: state => {
            state.error = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllUserSalesThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(getAllUserSalesThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                salesAdapter.setAll(state, action.payload);
            })
            .addCase(getAllUserSalesThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(changeSaleStatusThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(changeSaleStatusThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                salesAdapter.updateOne(state, { id: action.payload, changes: { status: 'completed' } });
            })
            .addCase(changeSaleStatusThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });
    }
});

export const { selectAll: selectAllSales } = salesAdapter.getSelectors(state => state.sales);
export const { removeOrderError } = salesSlise.actions;
export default salesSlise.reducer;
