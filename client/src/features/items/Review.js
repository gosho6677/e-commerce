import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import './Review.css';

import { useState } from 'react';

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

const Review = () => {
    const [comment, setComment] = useState('');
    const [reviewRating, setReviewRating] = useState(3);
    const [hover, setHover] = useState(-1);

    const submitReviewHandler = e => {
        e.preventDefault();

        console.log(comment);
        console.log(reviewRating);
    };

    return (
        <Paper elevation={3} className='reviews-container'>
            {/* create review box */}
            <Box onSubmit={submitReviewHandler} className='reviews-form' component='form'>
                <Typography variant='h4' className='create-title'>
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
                    placeholder='Comment here'
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

            {/* reviews container */}
            <Grid container direction='row' justifyContent='center' gap='10px' m='10px'>
                <Grid container direction='row' justifyContent='flex-start' sx={{ border: '1px solid lightgray' }}>
                    <Grid item>
                        <Grid container direction='column' sx={{ p: '10px', m: '10px', width: '250px' }}>
                            <Grid item>
                                <Avatar
                                    sx={{ width: 60, height: 60 }}
                                    srcSet={'https://i.pinimg.com/550x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg'}
                                    alt="comment user pic"
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' sx={{ wordBreak: 'break-all' }}>georig@palsldoaskdaosdksadsaadsdasds</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' color='text.secondary'>Added: 17 oct 2035</Typography>
                            </Grid>
                            <Grid item>
                                <Rating name="read-only" value={3} readOnly />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant='h5' sx={{
                            overflowWrap: 'break-word',
                            wordBreak: 'break-all',
                            // width: '80%',
                            maxWidth: '1000px',
                            p: '10px'
                        }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus debitis distinctio, sit voluptates quisquam, aspernatur impedit dolor unde eligendi aperiam error magni deserunt optio assumenda expedita amet vel. Corporis quia et veniam dolores a, labore eaque repellendus. Sunt odit quia fuga explicabo voluptatibus doloribus esse, asperiores, velit, earum tenetur veniam eos nisi laudantium temporibus illum quisquam saepe repellendus? Corrupti suscipit odit voluptas animi delectus unde veniam tempora aliquam fugit minima vel voluptatum excepturi maxime doloribus id iure iste accusamus ut maiores, nisi natus, velit optio quam quos. Necessitatibus esse, molestias minima eum laudantium error qui voluptate quidem, ex adipisci autem!
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='flex-start' sx={{ border: '1px solid lightgray' }}>
                    <Grid item>
                        <Grid container direction='column' sx={{ p: '10px', m: '10px', width: '250px' }}>
                            <Grid item>
                                <Avatar
                                    sx={{ width: 60, height: 60 }}
                                    srcSet={'https://i.pinimg.com/550x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg'}
                                    alt="comment user pic"
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' sx={{ wordBreak: 'break-all' }}>georig@palsldoaskdaosdksadsaadsdasds</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' color='text.secondary'>Added: 17 oct 2035</Typography>
                            </Grid>
                            <Grid item>
                                <Rating name="read-only" value={3} readOnly />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant='h5' sx={{
                            overflowWrap: 'break-word',
                            wordBreak: 'break-all',
                            // width: '80%',
                            maxWidth: '1000px',
                            p: '10px'
                        }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus debitis distinctio, sit voluptates quisquam, aspernatur impedit dolor unde eligendi aperiam error magni deserunt optio assumenda expedita amet vel. Corporis quia et veniam dolores a, labore eaque repellendus. Sunt odit quia fuga explicabo voluptatibus doloribus esse, asperiores, velit, earum tenetur veniam eos nisi laudantium temporibus illum quisquam saepe repellendus? Corrupti suscipit odit voluptas animi delectus unde veniam tempora aliquam fugit minima vel voluptatum excepturi maxime doloribus id iure iste accusamus ut maiores, nisi natus, velit optio quam quos. Necessitatibus esse, molestias minima eum laudantium error qui voluptate quidem, ex adipisci autem!
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='flex-start' sx={{ border: '1px solid lightgray' }}>
                    <Grid item>
                        <Grid container direction='column' sx={{ p: '10px', m: '10px', width: '250px' }}>
                            <Grid item>
                                <Avatar
                                    sx={{ width: 60, height: 60 }}
                                    srcSet={'https://i.pinimg.com/550x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg'}
                                    alt="comment user pic"
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' sx={{ wordBreak: 'break-all' }}>georig@palsldoaskdaosdksadsaadsdasds</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' color='text.secondary'>Added: 17 oct 2035</Typography>
                            </Grid>
                            <Grid item>
                                <Rating name="read-only" value={3} readOnly />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant='h5' sx={{
                            overflowWrap: 'break-word',
                            wordBreak: 'break-all',
                            // width: '80%',
                            maxWidth: '1000px',
                            p: '10px'
                        }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus debitis distinctio, sit voluptates quisquam, aspernatur impedit dolor unde eligendi aperiam error magni deserunt optio assumenda expedita amet vel. Corporis quia et veniam dolores a, labore eaque repellendus. Sunt odit quia fuga explicabo voluptatibus doloribus esse, asperiores, velit, earum tenetur veniam eos nisi laudantium temporibus illum quisquam saepe repellendus? Corrupti suscipit odit voluptas animi delectus unde veniam tempora aliquam fugit minima vel voluptatum excepturi maxime doloribus id iure iste accusamus ut maiores, nisi natus, velit optio quam quos. Necessitatibus esse, molestias minima eum laudantium error qui voluptate quidem, ex adipisci autem!
                        </Typography>
                    </Grid>
                </Grid>
               
                
            </Grid>
        </Paper >
    );
};

export default Review;