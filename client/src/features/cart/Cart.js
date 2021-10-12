import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Cart.css';
import CartCard from './CartCard';

import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';

const Cart = () => {
    const status = useSelector(state => state.cart.status);
    const cart = useSelector(state => state.cart.cart);
    // const dispatch = useDispatch();

    return (
        <Paper elevation={3} className='cart-container'>
            <Grid container direction='column' className='cart-item-container'>
                {cart?.items?.length
                    ? cart.items.map(c => <CartCard item={c} key={c.product._id} />)
                    : <Typography variant='h3'>No items in the cart yet!</Typography>
                }
            </Grid>
            <Box className='cart-checkout'>
                <Stack direction='column'>
                    <Typography variant='h5' className='cart-item-price'>{cart?.items?.length} products</Typography>
                    <Typography variant='h5' className='cart-total-price'>Total: ${cart.bill}</Typography>
                    <Button variant='contained'>Checkout</Button>
                </Stack>
            </Box>
        </Paper>
    );
};

export default Cart;