import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';
import { selectTotalItems } from './itemsSlice';

const Filters = () => {
    const itemsLength = useSelector(selectTotalItems);
    
    return (
        <Stack direction='row' alignItems='center' className='dashboard-items-stack' justifyContent='space-between'>
            <Typography component='span' className='dashboard-items-total'>{itemsLength} items</Typography>
            <Stack direction='row' alignItems='center'>
                <TextField id='standard-basic' label='Search' variant='standard' />
                <Typography component='span'>Sort by:</Typography>
                <Select
                    value={'newest'}
                // onChange={handleChange}
                >
                    <MenuItem value='newest'>Newest</MenuItem>
                    <MenuItem value='lowestPrice'>Lowest price</MenuItem>
                    <MenuItem value='highestPrice'>Highest price</MenuItem>
                </Select>
            </Stack>
        </Stack>
    );
};

export default Filters;