import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
    return (
        <Grid item className='dashboard-items-item'>
            <Card sx={{ maxWidth: '345px' }} className='dashboard-items-card'>
                <CardMedia
                    component='img'
                    image={item.imageUrl}
                    alt='item-cart'
                    className='dashboard-items-card-img'
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {item.name.length > 18
                            ? <Tooltip title={item.name} arrow>
                                <Typography gutterBottom variant='h5' component='div'>
                                    {item.name.slice(0, 23) + '...'}
                                </Typography>
                            </Tooltip>
                            : item.name
                        }
                    </Typography>
                    <Divider />
                    <Typography variant='h4' color='text.primary' sx={{ textAlign: 'center', mt: 2 }}>
                        ${item.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button><Link to={`/items/details/${item._id}`} className='dashboard-items-card-btn'>See More</Link></Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ItemCard;