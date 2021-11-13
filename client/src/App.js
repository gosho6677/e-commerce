import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Navigation from './features/navigation/Navigation';
import ErrorBox from './features/errors/ErrorBox';
import SuccessBox from './features/notification/SuccesBox';
import Create from './features/dashboard/items/Create';
import Details from './features/dashboard/items/Details';
import Cart from './features/cart/Cart';
import Orders from './features/orders/Orders';
import UserListings from './features/dashboard/items/UserListings';
import Edit from './features/dashboard/items/Edit';
import { getCartThunk } from './features/cart/cartSlice';
import isAuth from './hoc/isAuth';
import UserSales from './features/sales/UserSales';
import { getAccessToken, getRefreshToken } from './utils/tokenService';
import jwt_decode from 'jwt-decode';
import { loginOnReload } from './features/auth/authSlice';
import useGetItemsIfIdle from './hooks/useGetItemsIfIdle';
import ErrorBoundary from './features/errors/ErrorBoundary';

const App = () => {
    const userStatus = useSelector(state => state.user.status);
    const cartStatus = useSelector(state => state.cart.status);
    const userError = useSelector(state => state.user.error);
    const itemsError = useSelector(state => state.items.error);
    const cartError = useSelector(state => state.cart.error);
    const orderError = useSelector(state => state.orders.error);
    const salesError = useSelector(state => state.sales.error);
    const reviewsError = useSelector(state => state.reviews.error);
    const itemsNotification = useSelector(state => state.items.notification);
    const dispatch = useDispatch();

    // fetching all items in store on reload/load if it's empty
    // using it here instead in each component which uses or redirects to dashboard
    useGetItemsIfIdle();

    // check if on reload there is token in localstorage
    useEffect(() => {
        const token = getAccessToken();
        const refreshToken = getRefreshToken();
        // jwt_decode('asddads');
        if (token && refreshToken && userStatus === 'idle') {
            let user = jwt_decode(refreshToken);
            dispatch(loginOnReload(user));
        }

    }, [dispatch, userStatus]);

    // get existing or new cart for logged users
    useEffect(() => {
        if (userStatus === 'succeeded' && cartStatus === 'idle') {
            dispatch(getCartThunk());
        }
    }, [userStatus, cartStatus, dispatch]);

    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            {(itemsError || userError || cartError || orderError || salesError || reviewsError)
                && <ErrorBox
                    itemsError={itemsError}
                    userError={userError}
                    cartError={cartError}
                    orderError={orderError}
                    salesError={salesError}
                    reviewsError={reviewsError}
                />
            }
            {itemsNotification && <SuccessBox message={itemsNotification} />}
            <Navigation />
            <ErrorBoundary>
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/category/:category' exact component={Dashboard} />
                    <Route path='/my-orders' exact component={isAuth(Orders)} />
                    <Route path='/my-listings' exact component={isAuth(UserListings)} />
                    <Route path='/my-sales' exact component={isAuth(UserSales)} />
                    <Route path='/cart' exact component={isAuth(Cart)} />
                    <Route path='/items/create' exact component={isAuth(Create)} />
                    <Route path='/items/edit/:itemId' exact component={isAuth(Edit)} />
                    <Route path='/items/details/:itemId' exact component={Details} />
                    <Route path='/auth/login' exact component={Login} />
                    <Route path='/auth/register' exact component={Register} />
                    <Route path='*' render={() => <h1 style={{ textAlign: 'center' }}>Page not found...</h1>} />
                </Switch>
            </ErrorBoundary>
        </StyledEngineProvider>
    );
};

export default App;