import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const ShippingInfoStage = ({ setStage }) => {
    return (
        <Paper elevation={3} className='cart-container'>
            <Typography variant='h4'>Shipping details</Typography>
            <Grid container className='cart-shipping-info'>
                <Grid item className='cart-shipping-info-item'>
                    <TextField
                        required
                        id='name'
                        name='name'
                        label='Name'
                        fullWidth
                        autoComplete='given-name'
                        variant='standard'
                    />
                </Grid>
                <Grid item className='cart-shipping-info-item'>
                    <TextField
                        required
                        id='address'
                        name='address'
                        label='Address'
                        fullWidth
                        autoComplete='shipping address-line1'
                        variant='standard'
                    />
                </Grid>
                <Grid item className='cart-shipping-info-item'>
                    <TextField
                        required
                        id='city'
                        name='city'
                        label='City'
                        fullWidth
                        variant='standard'
                    />
                </Grid>
                <Grid item className='cart-shipping-info-item'>
                    <TextField
                        required
                        id='phone'
                        name='phone'
                        label='Phone'
                        fullWidth
                        variant='standard'
                        type='tel'
                    />
                </Grid>
                <Grid item className='cart-shipping-info-item'>
                    <Stack direction='row' justifyContent='flex-end' gap='5px'>
                        <Button onClick={() => setStage(1)} variant='outlined'>Back</Button>
                        <Button onClick={() => setStage(3)} variant='contained'>Review order</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ShippingInfoStage;