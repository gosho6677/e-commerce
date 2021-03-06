import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './Reviews.css';

import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from './ReviewCard';
import ReviewCreate from './ReviewCreate';
import { deleteReviewThunk, getAllReviewsThunk, selectAllReviews } from './reviewsSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectUserId } from '../../../auth/authSlice';


const Review = () => {
    const reviews = useSelector(selectAllReviews);
    const userId = useSelector(selectUserId);
    const userStatus = useSelector(state => state.user.status);
    const { itemId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReviewsThunk(itemId));
    }, [dispatch, itemId]);

    // it will get .bind when passed to prop and event becomes second param
    const deleteReviewHandler = (reviewId, e) => {
        dispatch(deleteReviewThunk(reviewId));
    };

    return (
        <Paper elevation={3} className='reviews-container'>
            {/* create review box */}
            {userStatus === 'succeeded' && <ReviewCreate />}

            {/* show only when theres no user to avoid similar titles */}
            {userStatus === 'idle' && (
                <Typography variant='h4'>
                    Reviews
                </Typography>
            )}

            {/* reviews container */}
            <Grid container direction='column' justifyContent='center' m='10px' gap='10px'>
                {reviews.length
                    ? reviews.map(r => (
                        <ReviewCard
                            key={r._id}
                            deleteReviewHandler={deleteReviewHandler.bind(null, r._id)}
                            isOwner={userId === r.creator._id}
                            {...r}
                        />
                    ))
                    : <Typography variant='h4' textAlign='center'>No reviews for this product yet...</Typography>
                }
            </Grid>
        </Paper >
    );
};

export default Review;