import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartThunk } from './cartSlice';

const CheckoutLastStage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const generateOrderNumber = () => Math.floor(Math.random() * 200_000);

    // when user leaves the checkout component
    // we dispatch to get new cart because the old one
    // gets deleted in the backend
    useEffect(() => {
        return () => {
            dispatch(getCartThunk());
        };
    }, [dispatch]);

    return (
        <Box className='checkout-box'>
            <Typography variant='h5'>Thank you for your order.</Typography>
            <Typography variant="subtitle1">
                Your order number is #{generateOrderNumber()}. We haven't emailed your order
                confirmation, and won't send you an update when your order has
                shipped.
            </Typography>
            <Stack direction='row' justifyContent='center'>
                <Button onClick={() => history.push('/')}>Dashboard</Button>
                <Button onClick={() => history.push('/my-orders')}>My orders</Button>
            </Stack>
        </Box>
    );
};

export default CheckoutLastStage;