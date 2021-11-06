import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { createReview, deleteReview, getAllReviews } from './reviewsAPI';

const reviewsAdapter = createEntityAdapter({
    selectId: review => review._id
});

const initialState = reviewsAdapter.getInitialState({
    status: 'idle',
    error: '',
    notification: ''
});

// get all reviews for one selected item
export const getAllReviewsThunk = createAsyncThunk(
    'reviews/get',
    async (itemId) => {
        const resp = await getAllReviews(itemId);

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return resp.reviews;
    }
);

export const createReviewThunk = createAsyncThunk(
    'reviews/create',
    async (body) => {
        let { comment, reviewRating, itemId } = body;

        if (!comment) {
            throw new Error('Comment section should not be empty!');
        }
        if (reviewRating < 1 || reviewRating > 5) {
            throw new Error('Review must be between 1 and 5');
        }

        const resp = await createReview({ comment, reviewRating, itemId });

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return resp.review;
    }
);

export const deleteReviewThunk = createAsyncThunk(
    'reviews/delete',
    async (reviewId) => {
        const resp = await deleteReview(reviewId);

        if (!resp.ok) {
            throw new Error(resp.error);
        }

        return resp.reviewId;
    }
);

// this state will be used for reviews on only 1 selected item not all of them 
const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        removeReviewError: (state) => {
            state.status = state.ids.length ? 'succeeded' : 'idle';
            state.error = '';
        },
        removeNotification: state => {
            state.notification = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllReviewsThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(getAllReviewsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                reviewsAdapter.setAll(state, action.payload);
            })
            .addCase(getAllReviewsThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(createReviewThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(createReviewThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                reviewsAdapter.setOne(state, action.payload);
            })
            .addCase(createReviewThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(deleteReviewThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(deleteReviewThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                reviewsAdapter.removeOne(state, action.payload);
            })
            .addCase(deleteReviewThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });
    }
});

export const {
    selectAll: selectAllReviews,
    selectById: selectReviewById,
} = reviewsAdapter.getSelectors(state => state.reviews);
export const { removeReviewError, removeNotification } = reviewsSlice.actions;
export default reviewsSlice.reducer;