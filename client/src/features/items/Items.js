import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './Items.css';

import Filters from './Filters';
import ItemCard from './ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllItemsThunk, selectAllItems } from './itemsSlice';
import { useParams } from 'react-router-dom';

const Items = () => {
    const { category } = useParams();
    const status = useSelector(state => state.items.status);
    const items = useSelector(state => {
        if (category) {
            // remove the 's' (phones => phone)
            let searchParam = category.slice(0, -1);
            return Object.values(state.items.entities)
                .filter(x => x.category === searchParam);
        }
        return selectAllItems(state);
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllItemsThunk());
        }
    }, [dispatch, status]);

    return (
        <Paper elevation={6} className='dashboard-items'>
            <Filters />
            <Grid container className='dashboard-items-container'>
                {status === 'succeeded'
                    ? items.map(i => <ItemCard item={i} key={i._id} />)
                    : <Typography variant='h2'>No items available...</Typography>
                }
            </Grid>
        </Paper>
    );
};

export default Items;