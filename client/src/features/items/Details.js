import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Details.css';

import { useSelector } from 'react-redux';

const Details = ({ match }) => {
    const status = useSelector(state => state.user.status);
    const itemId = match.params.id;
    console.log(itemId);
    return (
        <Paper elevation={3} className='details-container'>
            <Box className='details-img-container'>
                <img className='details-img' src='https://cdn.technomarket.bg/ng/media/cache/mid_thumb/uploads/library/product/09199881/614872121ee14.png.webp' alt='details' />
            </Box>
            <Box className='details-item-content'>
                <Typography variant='h4'>Iphone 13</Typography>
                <Divider />
                {/* <Typography variant='h5'>Category: Phone</Typography> */}
                <Typography variant='h6' className='details-item-description'>Description: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium fuga harum, nam ipsa iste culpa totam facilis necessitatibus sed quas! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione non cupiditate nam a exercitationem nostrum quas vero, inventore consequatur fugit voluptatum id nemo repellat deserunt, corrupti aut accusantium ad quaerat. Iusto, natus doloremque deleniti ea at similique dolore ipsum et. Dolor quos ut accusamus omnis molestiae eius est maiores quam totam pariatur quo minima vitae esse, fugiat laboriosam illo nobis quasi corporis, fuga, doloremque alias distinctio animi aliquam labore? Voluptatibus placeat quod illum voluptatum nisi nulla, optio eos amet voluptates ipsum possimus quisquam ducimus fugiat magnam vero nesciunt error eveniet? Cupiditate nam esse consectetur ullam voluptate dolor eaque in?</Typography>
                <Divider />
                <Stack direction='column' alignItems='center'>
                    <Typography className='details-price'>1099$</Typography>
                    <Divider />
                    {status === 'succeeded'
                        ? <Button variant='contained'>Add to cart</Button>
                        : <Typography variant='h4' color='text.secondary'>If you want to purchase this product, please login or register.</Typography>
                    }
                </Stack>
            </Box>
        </Paper>
    );
};

export default Details;