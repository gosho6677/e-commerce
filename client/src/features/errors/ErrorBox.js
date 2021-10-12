import { useDispatch } from 'react-redux';
import { removeUserError } from '../auth/authSlice';
import { removeCartError } from '../cart/cartSlice';
import { removeItemError } from '../items/itemsSlice';
import './ErrorBox.css';

const ErrorBox = ({ itemsError, userError, cartError }) => {
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
        dispatch(removeUserError());
        dispatch(removeItemError());
        dispatch(removeCartError());
    };

    return (
        <div onClick={errorHandler} className="error">
            {itemsError && itemsError}
            {userError && userError}
            {cartError && cartError}
        </div>
    );
};
 
export default ErrorBox;