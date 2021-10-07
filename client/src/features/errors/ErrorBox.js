import { useDispatch } from 'react-redux';
import { removeUserError } from '../auth/authSlice';
import './ErrorBox.css';

const ErrorBox = ({ error }) => {
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
    };

    return (
        <div onClick={errorHandler} className="error">
            {error}
        </div>
    );
};
 
export default ErrorBox;