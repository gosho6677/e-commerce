import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { selectTotalItems, sortByAction } from './itemsSlice';
import { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';

const Filters = ({ searchQuery, setSearchQuery }) => {
    const [sortBy, setSortBy] = useState('name');
    const itemsLength = useSelector(selectTotalItems);
    const debounce = useDebounce();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sortByAction(sortBy));
    }, [dispatch, sortBy]);

    return (
        <Stack direction='row' alignItems='center' className='dashboard-items-stack' justifyContent='space-between'>
            <Typography component='span' className='dashboard-items-total'>{itemsLength} items total.</Typography>
            <Stack direction='row' alignItems='center'>
                <TextField
                    id='standard-basic'
                    label='Search'
                    variant='standard'
                    onChange={debounce(setSearchQuery)}
                />
                <Button></Button>
                <Typography component='span'>Sort by:</Typography>
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <MenuItem value='name'>Name</MenuItem>
                    <MenuItem value='lowestPrice'>Lowest price</MenuItem>
                    <MenuItem value='highestPrice'>Highest price</MenuItem>
                </Select>
            </Stack>
        </Stack>
    );
};

export default Filters;