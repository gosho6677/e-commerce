import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { delAccessToken, delRefreshToken } from '../../utils/tokenService';
import { forcedLogout, removeUserError } from '../auth/authSlice';
import { removeCartError } from '../cart/cartSlice';
import { removeItemError } from '../items/itemsSlice';
import { removeOrderError } from '../orders/orderSlice';
import { removeSalesError } from '../sales/salesSlice';
import './ErrorBox.css';

const expiredSessionError = 'Session expired! Please try logging in again!';

const ErrorBox = ({ itemsError, userError, cartError, orderError, salesError }) => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const timeOut = setTimeout(() => {
    //         dispatch(removeError());
    //     }, 10000);

    //     return () => {
    //         dispatch(removeError());
    //         clearTimeout(timeOut);
    //     };
    // }, [removeError, dispatch]);

    useEffect(() => {
        if (itemsError === expiredSessionError ||
            userError === expiredSessionError ||
            cartError === expiredSessionError ||
            salesError === expiredSessionError ||
            orderError === expiredSessionError) {
            dispatch(forcedLogout());
            delRefreshToken();
            delAccessToken();
        }
    }, [dispatch, itemsError, userError, cartError, orderError, salesError]);

    const errorHandler = () => {
        userError && dispatch(removeUserError());
        itemsError && dispatch(removeItemError());
        cartError && dispatch(removeCartError());
        orderError && dispatch(removeOrderError());
        salesError && dispatch(removeSalesError());
    };

    return (
        <div onClick={errorHandler} className="error">
            {itemsError && itemsError}
            {userError && userError}
            {cartError && cartError}
            {orderError && orderError}
            {salesError && salesError}
        </div>
    );
};

export default ErrorBox;