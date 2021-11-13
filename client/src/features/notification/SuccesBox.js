import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../dashboard/items/itemsSlice';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// coppied from mui.com
const SuccessBox = ({ message }) => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        dispatch(removeNotification());

        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SuccessBox;