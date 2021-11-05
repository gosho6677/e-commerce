import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const ReviewCard = ({ comment, reviewRating, creator, createdAt }) => {

    return (
        <Grid item>
            <Grid container direction='row' justifyContent='flex-start' sx={{ border: '1px solid lightgray' }}>
                <Grid item>
                    <Grid container direction='column' sx={{ p: '10px', m: '10px', width: '250px' }}>
                        <Grid item>
                            <Avatar
                                sx={{ width: 60, height: 60 }}
                                srcSet={creator.imageUrl}
                                alt="comment user pic"
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant='h6' sx={{ wordBreak: 'break-all' }}>
                                {creator.email}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1' color='text.secondary'>
                                {new Date(createdAt).toDateString()}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Rating name="read-only" value={reviewRating} readOnly />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item flex='1'>
                    <Typography variant='h6' sx={{
                        overflowWrap: 'break-word',
                        wordBreak: 'break-all',
                        p: '10px'
                    }}>
                        {comment}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReviewCard;