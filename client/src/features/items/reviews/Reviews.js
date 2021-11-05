import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './Reviews.css';

import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from './ReviewCard';
import ReviewCreate from './ReviewCreate';
import { getAllReviewsThunk, selectAllReviews } from './reviewsSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Review = () => {
    const reviews = useSelector(selectAllReviews);
    const userStatus = useSelector(state => state.user.status);
    const { itemId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReviewsThunk(itemId));
    }, [dispatch, itemId]);

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
                    ? reviews.map(r => <ReviewCard key={r._id} {...r} />)
                    : <Typography variant='h4' textAlign='center'>No reviews for this product yet...</Typography>
                }
            </Grid>
        </Paper >
    );
};

export default Review;