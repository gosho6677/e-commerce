import { useDispatch } from 'react-redux';
import { removeUserError } from '../auth/authSlice';
import { removeItemError } from '../items/itemsSlice';
import './ErrorBox.css';

const ErrorBox = ({ itemsError, userError }) => {
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
    };

    return (
        <div onClick={errorHandler} className="error">
            {itemsError && itemsError}
            {userError && userError}
        </div>
    );
};
 
export default ErrorBox;