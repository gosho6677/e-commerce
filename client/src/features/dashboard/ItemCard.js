import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
    return (
        <Grid item className='dashboard-items-item'>
            <Card sx={{ maxWidth: 345 }} className='dashboard-items-card'>
                <CardMedia
                    component='img'
                    image={item.imageUrl}
                    alt='green iguana'
                    className='dashboard-items-card-img'
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {item.name}
                    </Typography>
                    <Divider />
                    <Typography variant='h4' color='text.primary' sx={{ textAlign: 'center', mt: 2 }}>
                        {item.price}$
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