import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { selectUserListings } from './itemsSlice';
import ItemCard from './ItemCard';

const UserListings = () => {
    const items = useSelector(selectUserListings);
    
    return (
        <Paper elevation={3} sx={{ width: '90%', m: '10px auto' }}>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>My listings:</Typography>
            <Grid container justifyContent='center'>
                {items.length 
                    ? items.map(x => <ItemCard item={x} key={x._id} />)
                    : <Typography variant='h3'>You have no listings yet!</Typography>
                }
            </Grid>
        </Paper>
    );
};

export default UserListings;