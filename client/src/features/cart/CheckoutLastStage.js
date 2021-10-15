import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useHistory } from 'react-router-dom';

const CheckoutLastStage = () => {
    const history = useHistory();
    const generateOrderNumber = () => Math.floor(Math.random() * 200_000);
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