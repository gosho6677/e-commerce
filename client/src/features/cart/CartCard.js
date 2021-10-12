import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartCard = ({ item }) => {
    return (
        <Grid item>
            <Card className='cart-item-card'>
                <CardMedia
                    component="img"
                    sx={{ maxWidth: '250px', m: 1 }}
                    image={item.product.imageUrl}
                    alt="Cart item"
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent>
                        <Typography component="div" variant="h5" marginBottom='5px'>
                            {item.product.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" marginBottom='5px' component="div">
                            ${item.product.price * item.quantity}
                        </Typography>
                        <Stack
                            direction='row'
                            alignItems='center'
                            className='card-item-quantity'
                        >
                            <IconButton>
                                <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ p: 1 }} variant="subtitle1" color="text.primary" component="div">
                                {item.quantity}
                            </Typography>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                        {/* TODO remove btn */}
                        <Button variant='text' className='cart-remove-btn'>Remove</Button>
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    );
};

export default CartCard;