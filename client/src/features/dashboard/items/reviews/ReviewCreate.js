import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { createReviewThunk } from "./reviewsSlice";

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

const ReviewCreate = () => {
    const { itemId } = useParams();
    const [comment, setComment] = useState('');
    const [reviewRating, setReviewRating] = useState(3);
    const [hover, setHover] = useState(-1);
    const dispatch = useDispatch();

    const submitReviewHandler = e => {
        e.preventDefault();

        dispatch(createReviewThunk({ comment, reviewRating, itemId }))
            .then(res => {
                if (res.error) return;
                setComment('');
                setReviewRating(3);
            });
    };

    return (
        <Box onSubmit={submitReviewHandler} className='reviews-form' component='form'>
            <Typography variant='h4' className='create-title' marginTop='10px'>
                Add review
            </Typography>
            <Stack direction='column' alignContent='center'>
                <Rating
                    name="hover-feedback"
                    value={reviewRating}
                    precision={1}
                    onChange={(event, newValue) => {
                        setReviewRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {reviewRating !== null && (
                    <Box sx={{ textAlign: 'center' }}>{labels[hover !== -1 ? hover : reviewRating]}</Box>
                )}
            </Stack>
            <TextareaAutosize
                aria-label='empty textarea'
                className='create-review-comment'
                minRows='10'
                placeholder='Comment here...'
                required
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <Button
                type='submit'
                variant='contained'
                className='create-review-btn'
            >
                SUBMIT
            </Button>
        </Box>
    );
};

export default ReviewCreate;