import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import './Items.css';

import Filters from './Filters';
import ItemCard from './ItemCard';
import useItemsQueries from '../../../hooks/useItemsQueries';
import { useSelector } from 'react-redux';

const Items = () => {
    const status = useSelector(state => state.items.status);
    const {
        items,
        searchQuery,
        setSearchQuery,
        page,
        totalPages,
        handlePageChange
    } = useItemsQueries();

    return (
        <Paper elevation={6} className='dashboard-items'>
            <Filters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Grid container className='dashboard-items-container'>
                {status !== 'idle'
                    ? items.map(i => <ItemCard item={i} key={i._id} />)
                    : <Typography variant='h2'>No items available...</Typography>
                }
            </Grid>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                size='large'
                sx={{ m: '5px auto' }}
            />
        </Paper>
    );
};

export default Items;