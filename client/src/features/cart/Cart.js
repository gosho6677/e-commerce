import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Cart.css';

const Cart = () => {
    return (
        <Paper elevation={3} className='cart-container'>
            <Grid container direction='column' className='cart-item-container'>
                <Grid item>
                    <Card className='cart-item-card'>
                        <CardMedia
                            component="img"
                            sx={{ maxWidth: '250px' }}
                            image="https://icenter.bg/wp-content/uploads/2021/09/iphone_13_pro_sierra_blue_pdp_image_position-2__wwen_1_1.jpg"
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <CardContent>
                                <Typography component="div" variant="h5" marginBottom='5px'>
                                    Iphone 13
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" marginBottom='5px' component="div">
                                    $1099
                                </Typography>
                                <Stack direction='row' alignItems='center' className='card-item-quantity'>
                                    <IconButton>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography sx={{ p: 1 }} variant="subtitle1" color="text.primary" component="div">
                                        1
                                    </Typography>
                                    <IconButton>
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                                <Button variant='text' className='cart-remove-btn'>Remove</Button>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Box className='cart-checkout'>
                <Stack direction='column'>
                    <Typography variant='h5' className='cart-item-price'>20 products</Typography>
                    <Typography variant='h5' className='cart-total-price'>Total: $1099</Typography>
                    <Button variant='contained'>Checkout</Button>
                </Stack>
            </Box>
        </Paper>
    );
};

export default Cart;