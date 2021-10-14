// import Paper from '@mui/material/Paper';
import './Cart.css';

import LoadingSpinner from '../loading/LoadingSpinner';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import CartStage from './CartStage';
import ShippingInfoStage from './ShippingInfoStage';
import ReviewOrderStage from './ReviewOrderStage';

const Cart = () => {
    const status = useSelector(state => state.cart.status);
    const [stage, setStage] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({});
    // const cart = useSelector(state => state.cart.cart);

    if(status === 'loading') {
        return <LoadingSpinner />;
    }
    
    if(stage === 1) {
        return <CartStage setStage={setStage} />;
    } else if (stage === 2) {
        return <ShippingInfoStage setShippingInfo={setShippingInfo} setStage={setStage} />;
    } else if (stage === 3) {
        return <ReviewOrderStage shippingInfo={shippingInfo} setStage={setStage} />;
    } else {
        return null;
    }
};

export default Cart;