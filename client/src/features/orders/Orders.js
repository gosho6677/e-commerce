import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './Orders.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersThunk } from './orderSlice';

const test = [1, 2, 3, 4];

const Orders = ({ history }) => {
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(false);

    const expandHandler = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const redirectHandler = (itemId) => () => history.push(`/items/details/${itemId}`);

    useEffect(() => {
        dispatch(getOrdersThunk());
    }, [dispatch]);


    return (
        <Paper elevation={3} className='orders-container'>
            <Typography variant='h4' sx={{ textAlign: 'center' }}>My orders</Typography>
            {test.map((x, i) => {
                return (
                    <Accordion
                        className='orders-item'
                        expanded={expanded === `panel${i}`}
                        onChange={expandHandler(`panel${i}`)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Order &#8470; {x}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* loop through cart items here */}
                            <Card className='order-card'>
                                <CardMedia
                                    component="img"
                                    className='order-card-img'
                                    height="150"
                                    image="https://cdncloudcart.com/402/products/images/109837/smartfon-apple-iphone-13-mini-128gb-midnight--128-gb-4-gb-image_6152c1a87fcba_600x600.jpeg?1632813506"
                                    alt="order-cart"
                                    onClick={redirectHandler('SOME_ID_HERE!!!')}
                                />
                                <CardContent className='order-card-content'>
                                    <Typography>
                                        Samsung Galaxy S21 FE
                                    </Typography>
                                    <Typography>
                                        Quantity: 13
                                    </Typography>
                                    <Typography>
                                        Price per one: $999
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Typography variant='h5'>Order info:</Typography>
                            <Typography variant='h6' color='text.secondary'>Name: Georgi</Typography>
                            <Typography variant='h6' color='text.secondary'>Address: Str 16</Typography>
                            <Typography variant='h6' color='text.secondary'>City: Lebanon</Typography>
                            <Typography variant='h6' color='text.secondary'>Phone: 081293812</Typography>
                            <Typography variant='h6' color='text.secondary'>Created: {new Date(1634297861548).toUTCString()}</Typography>
                            <Typography variant='h6' color='text.primary'>Total: $5002</Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}


        </Paper>
    );
};

export default Orders;