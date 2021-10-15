import { useDispatch } from 'react-redux';
import { removeUserError } from '../auth/authSlice';
import { removeCartError } from '../cart/cartSlice';
import { removeItemError } from '../items/itemsSlice';
import { removeOrderError } from '../orders/orderSlice';
import './ErrorBox.css';

const ErrorBox = ({ itemsError, userError, cartError, orderError }) => {
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

    const errorHandler = () => {
        userError && dispatch(removeUserError());
        itemsError && dispatch(removeItemError());
        cartError && dispatch(removeCartError());
        cartError && dispatch(removeOrderError());
    };

    return (
        <div onClick={errorHandler} className="error">
            {itemsError && itemsError}
            {userError && userError}
            {cartError && cartError}
            {orderError && orderError}
        </div>
    );
};
 
export default ErrorBox;