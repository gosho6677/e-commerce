import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import './Items.css';

import Filters from './Filters';
import { Link } from 'react-router-dom';


const Items = () => {
    return (
        <Paper elevation={6} className='dashboard-items'>
            <Filters />
            <Grid container className='dashboard-items-container'>
                <Grid item className='dashboard-items-item'>
                    <Card sx={{ maxWidth: 345 }} className='dashboard-items-card'>
                        <CardMedia
                            component='img'

                            image='https://cdn.technomarket.bg/ng/media/cache/mid_thumb/uploads/library/product/09199881/614872121ee14.png.webp'
                            alt='green iguana'
                            className='dashboard-items-card-img'
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                                Iphone 13
                            </Typography>
                            <Divider />
                            <Typography variant='h4' color='text.primary' sx={{ textAlign: 'center', mt: 2 }}>
                                1099$
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button><Link to='/' className='dashboard-items-card-btn'>See More</Link></Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item className='dashboard-items-item'>
                    <Card sx={{ maxWidth: 345 }} className='dashboard-items-card'>
                        <CardMedia
                            component='img'

                            image='https://s13emagst.akamaized.net/products/32539/32538463/images/res_ca8432c4d8f2e2cd4e0e3b80d9a12b31.jpg'
                            alt='green iguana'
                            className='dashboard-items-card-img'
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                                Samsung Galaxy S20 FE
                            </Typography>
                            <Divider />
                            <Typography variant='h4' color='text.primary' sx={{ textAlign: 'center', mt: 2 }}>
                                1199$
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button><Link to='/' className='dashboard-items-card-btn'>See More</Link></Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Items;