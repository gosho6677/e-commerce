import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

import { forwardRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { delAccessToken, delRefreshToken } from '../../utils/tokenService';
import { forcedLogout, removeUserError } from '../auth/authSlice';
import { removeCartError } from '../cart/cartSlice';
import { removeItemError } from '../dashboard/items/itemsSlice';
import { removeReviewError } from '../dashboard/items/reviews/reviewsSlice';
import { removeOrderError } from '../orders/orderSlice';
import { removeSalesError } from '../sales/salesSlice';
import './ErrorBox.css';

const expiredSessionError = 'Session expired! Please try logging in again!';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorBox = ({
    itemsError,
    userError,
    cartError,
    orderError,
    salesError,
    reviewsError,
}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if ([
            itemsError,
            userError,
            cartError,
            salesError,
            orderError,
            reviewsError,
        ].includes(expiredSessionError)) {
            dispatch(forcedLogout());
            delRefreshToken();
            delAccessToken();
        }
    }, [dispatch, itemsError, userError, cartError, orderError, salesError, reviewsError]);

    useEffect(() => {
        if (itemsError ||
            userError ||
            cartError ||
            salesError ||
            orderError ||
            reviewsError) {
            setOpen(true);
        }

        return () => setOpen(false);
    }, [itemsError, userError, cartError, orderError, salesError, reviewsError]);

    const closeErrorBox = (e, reason) => {
        if (reason === "clickaway") return;

        userError && dispatch(removeUserError());
        itemsError && dispatch(removeItemError());
        cartError && dispatch(removeCartError());
        orderError && dispatch(removeOrderError());
        salesError && dispatch(removeSalesError());
        reviewsError && dispatch(removeReviewError());

        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={20000}
            onClose={closeErrorBox}
        >
            <Alert onClose={closeErrorBox} severity="error" sx={{ width: "100%", whiteSpace: 'pre-line' }}>
                {itemsError && itemsError}
                {userError && userError}
                {cartError && cartError}
                {orderError && orderError}
                {salesError && salesError}
                {reviewsError && reviewsError}
            </Alert>
        </Snackbar>
    );
};

export default ErrorBox;