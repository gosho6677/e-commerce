import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import './Details.css';

import { useSelector, useDispatch } from 'react-redux';
import { deleteItemThunk, selectItemById } from './itemsSlice';
import { addToCartThunk, selectCartId } from '../cart/cartSlice';
import { selectUserId } from '../auth/authSlice';
import { useState } from 'react';
import Reviews from './reviews/Reviews';
import DeleteItemModal from './DeleteItemModal';
import { selectAverageRating, selectTotalReviews } from './reviews/reviewsSlice';

const Details = ({ match, history }) => {
    const itemId = match.params.itemId;
    const userId = useSelector(selectUserId);
    const cartId = useSelector(selectCartId);
    const status = useSelector(state => state.user.status);
    const item = useSelector(state => selectItemById(state, itemId));
    const averageRating = useSelector(selectAverageRating);
    const totalReviews = useSelector(selectTotalReviews);
    const isOwner = (item && userId) ? item.creatorId === userId : null;
    const dispatch = useDispatch();
    // state for modal
    const [isOpen, setIsOpen] = useState(false);

    const addToCartHandler = () => {
        dispatch(addToCartThunk({
            cartId,
            productOwner: item.creatorId,
            productId: itemId,
            quantity: 1,
        }));
        history.push('/cart');
    };

    const editRedirectHandler = () => {
        history.push(`/items/edit/${itemId}`);
    };

    const deleteItemHandler = () => {
        dispatch(deleteItemThunk(itemId))
            .then(res => {
                if (res.error) return;
                setIsOpen(false);
                history.push('/');
            });
    };

    return (
        <>
            <DeleteItemModal
                deleteItemHandler={deleteItemHandler}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <Paper elevation={3} className='details-container'>
                <Box className='details-img-container'>
                    <img className='details-img' src={item?.imageUrl} alt='details' />
                </Box>
                <Box className='details-item-content'>
                    <Typography variant='h4' paragraph>{item?.name}</Typography>

                    {averageRating
                        ? <>
                            <Rating value={averageRating} readOnly precision={0.10} />
                            <Typography variant='body1' sx={{ display: 'inline', verticalAlign: 'top' }}>
                                <b>{averageRating}</b> (<i>{totalReviews} reviews</i>)
                            </Typography>
                        </>
                        : null
                    }

                    <Divider />
                    {/* <Typography variant='h5'>Category: {item?.category}</Typography> */}
                    <Typography variant='h6' className='details-item-description'>
                        Description: {item?.description}
                    </Typography>
                    <Divider />
                    <Stack direction='column' alignItems='center'>
                        <Typography className='details-price'>${item?.price}</Typography>
                        <Divider />
                        {/* shows btns depending if user is logged(succeeded)/owner */}
                        {status === 'succeeded'
                            ? isOwner
                                ? <Stack direction='row' gap='5px'>
                                    <Button onClick={() => setIsOpen(true)} color='error' variant='contained'>Delete</Button>
                                    <Button onClick={editRedirectHandler} variant='contained'>Edit</Button>
                                </Stack>
                                : <Button onClick={addToCartHandler} variant='contained'>Add to cart</Button>
                            : <Typography variant='h4' color='text.secondary' sx={{ textAlign: 'center' }}>If you want to purchase this product, please login or register.</Typography>
                        }
                    </Stack>
                </Box>
            </Paper>

            <Reviews />
        </>
    );
};

export default Details;