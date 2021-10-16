import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './Orders.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersThunk } from './orderSlice';
import LoadingSpinner from '../loading/LoadingSpinner';

const Orders = ({ history }) => {
    const orders = useSelector(state => state.orders.orders);
    const orderStatus = useSelector(state => state.orders.status);
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(false);

    const expandHandler = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const redirectHandler = (itemId) => () => history.push(`/items/details/${itemId}`);

    useEffect(() => {
        dispatch(getOrdersThunk());
    }, [dispatch]);

    if (orderStatus === 'loading') {
        return <LoadingSpinner />;
    }

    return (
        <Paper elevation={3} className='orders-container'>
            <Typography variant='h4' sx={{ textAlign: 'center' }}>My orders</Typography>
            {orders.map((order, i) => {
                return (
                    <Accordion
                        className='orders-item'
                        expanded={expanded === `panel${i}`}
                        onChange={expandHandler(`panel${i}`)}
                        key={order._id}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Order &#8470; {i+1}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {order.cart.items.map(item => {
                                return (
                                    <Card className='order-card' key={item._id}>
                                        <CardMedia
                                            component="img"
                                            className='order-card-img'
                                            height="150"
                                            image={item.product.imageUrl}
                                            alt="order-cart-image"
                                            onClick={redirectHandler(item.product._id)}
                                        />
                                        <CardContent className='order-card-content'>
                                            <Typography>
                                                {item.product.name}
                                            </Typography>
                                            <Typography>
                                                Quantity: {item.quantity}
                                            </Typography>
                                            <Typography>
                                                Price per one: ${item.product.price}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                            <Typography variant='h5'>Order info:</Typography>
                            <Typography variant='h6' color='text.secondary'>Name: {order.shippingAddress.name}</Typography>
                            <Typography variant='h6' color='text.secondary'>Address: {order.shippingAddress.address}</Typography>
                            <Typography variant='h6' color='text.secondary'>City: {order.shippingAddress.city}</Typography>
                            <Typography variant='h6' color='text.secondary'>Phone: {order.shippingAddress.phone}</Typography>
                            <Typography variant='h6' color='text.secondary'>Created: {new Date(Number(order.added)).toUTCString()}</Typography>
                            <Typography variant='h6' color='text.primary'>Total: ${order.cart.bill}</Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}


        </Paper>
    );
};

export default Orders;