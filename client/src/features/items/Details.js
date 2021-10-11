import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Details.css';

import { useSelector } from 'react-redux';
import { selectPostById } from './itemsSlice';

const Details = ({ match }) => {
    const status = useSelector(state => state.user.status);
    const itemId = match.params.id;
    const item = useSelector(state => selectPostById(state, itemId));
    // TODO: fix problem on page reload to fetch the selected 
    // id instead to select it through redux store
    
    return (
        <Paper elevation={3} className='details-container'>
            <Box className='details-img-container'>
                <img className='details-img' src={item?.imageUrl} alt='details' />
            </Box>
            <Box className='details-item-content'>
                <Typography variant='h4' paragraph>{item?.name}</Typography>
                <Divider />
                {/* <Typography variant='h5'>Category: {item?.category}</Typography> */}
                <Typography variant='h6' className='details-item-description'>
                    Description: {item?.description}
                </Typography>
                <Divider />
                <Stack direction='column' alignItems='center'>
                    <Typography className='details-price'>${item?.price}</Typography>
                    <Divider />
                    {/* shows btn if user is logged(succeeded) */}
                    {status === 'succeeded'
                        ? <Button variant='contained'>Add to cart</Button>
                        : <Typography variant='h4' color='text.secondary' sx={{textAlign: 'center'}}>If you want to purchase this product, please login or register.</Typography>
                    }
                </Stack>
            </Box>
        </Paper>
    );
};

export default Details;