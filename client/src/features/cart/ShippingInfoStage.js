import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const ShippingInfoStage = ({ setShippingInfo, setStage }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    const shippingInfoHandler = e => {
        if (!name || !address || !city || !phone) {
            return;
        }

        setShippingInfo({ name, address, city, phone });
        setStage(3);
    };

    return (
        <Paper elevation={3} className='cart-container'>
            <Typography variant='h4'>Shipping details</Typography>
            <Grid container component='form' className='cart-shipping-info'>
                <Grid item className='cart-shipping-info-item'>
                    <TextField
                        required
                        id='name'
                        name='name'
                        label='Name'
                        fullWidth
                        autoComplete='given-name'
                        variant='standard'
                        value={name}
                        onChange={e => setName(e.target.value)}
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
                        value={address}
                        onChange={e => setAddress(e.target.value)}
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
                        value={city}
                        onChange={e => setCity(e.target.value)}
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
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </Grid>
                <Grid item className='cart-shipping-info-item'>
                    <Stack direction='row' justifyContent='flex-end' gap='5px'>
                        <Button onClick={() => setStage(1)} variant='outlined'>Back</Button>
                        <Button onClick={shippingInfoHandler} variant='contained'>Review order</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ShippingInfoStage;