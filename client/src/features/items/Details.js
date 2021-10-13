import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Details.css';

import { useSelector, useDispatch } from 'react-redux';
import { selectPostById } from './itemsSlice';
import { addToCartThunk } from '../cart/cartSlice';

const Details = ({ match, history }) => {
    const itemId = match.params.id;
    const cart = useSelector(state => state.cart.cart);
    const status = useSelector(state => state.user.status);
    const item = useSelector(state => selectPostById(state, itemId));
    const dispatch = useDispatch();
    // TODO: fix problem on page reload to fetch the selected 
    // id instead to select it through redux store
    
    const addToCartHandler = e => {
        dispatch(addToCartThunk({
            cartId: cart._id,
            productId: itemId,
            quantity: 1,
        }));
        history.push('/cart');
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
                    {/* shows btn if user is logged(succeeded) */}
                    {status === 'succeeded'
                        ? <Button onClick={addToCartHandler} variant='contained'>Add to cart</Button>
                        : <Typography variant='h4' color='text.secondary' sx={{textAlign: 'center'}}>If you want to purchase this product, please login or register.</Typography>
                    }
                </Stack>
            </Box>
        </Paper>
    );
};

export default Details;