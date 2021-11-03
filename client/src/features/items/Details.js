import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Details.css';

import { useSelector, useDispatch } from 'react-redux';
import { deleteItemThunk, selectItemById } from './itemsSlice';
import { addToCartThunk, selectCartId } from '../cart/cartSlice';
import { selectUserId } from '../auth/authSlice';

const Details = ({ match, history }) => {
    const itemId = match.params.itemId;
    const userId = useSelector(selectUserId);
    const cartId = useSelector(selectCartId);
    const status = useSelector(state => state.user.status);
    const item = useSelector(state => selectItemById(state, itemId));
    const isOwner = (item && userId) ? item.creatorId === userId : null;
    const dispatch = useDispatch();

    const addToCartHandler = e => {
        dispatch(addToCartThunk({
            cartId,
            productOwner: item.creatorId,
            productId: itemId,
            quantity: 1,
        }));
        history.push('/cart');
    };

    const editRedirectHandler = e => {
        history.push(`/items/edit/${itemId}`);
    };

    const deleteItemHandler = e => {
        dispatch(deleteItemThunk(itemId));
        history.push('/');
    };

    return (
        <Paper elevation={3} className='details-container'>
            <Box className='details-img-container'>
                <img className='details-img' src={item?.imageUrl} alt='details' />
            </Box>
            <Box className='details-item-content'>
                <Typography variant='h4' paragraph>{item?.name}</Typography>
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
                                <Button onClick={deleteItemHandler} color='error' variant='contained'>Delete</Button>
                                <Button onClick={editRedirectHandler} variant='contained'>Edit</Button>
                            </Stack>
                            : <Button onClick={addToCartHandler} variant='contained'>Add to cart</Button>
                        : <Typography variant='h4' color='text.secondary' sx={{ textAlign: 'center' }}>If you want to purchase this product, please login or register.</Typography>
                    }
                </Stack>
            </Box>
        </Paper>
    );
};

export default Details;