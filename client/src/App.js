import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Navigation from './features/navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBox from './features/errors/ErrorBox';
import Create from './features/items/Create';
import Details from './features/items/Details';
import Cart from './features/cart/Cart';
import { useEffect } from 'react';
import { getCartThunk } from './features/cart/cartSlice';

const App = () => {
    const userStatus = useSelector(state => state.user.status);
    const cartStatus = useSelector(state => state.cart.status);
    const userError = useSelector(state => state.user.error);
    const itemsError = useSelector(state => state.items.error);
    const cartError = useSelector(state => state.cart.error);
    const dispatch = useDispatch();

    // get existing or new cart for logged users
    useEffect(() => {
        if (userStatus === 'succeeded' && cartStatus === 'idle') {
            dispatch(getCartThunk());
        }
    }, [userStatus, cartStatus, dispatch]);

    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            {(itemsError || userError || cartError)
                && <ErrorBox
                    itemsError={itemsError}
                    userError={userError}
                    cartError={cartError}
                />
            }
            <Navigation />
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/cart' exact component={Cart} />
                <Route path='/items/create' exact component={Create} />
                <Route path='/items/details/:id' exact component={Details} />
                <Route path='/auth/login' exact component={Login} />
                <Route path='/auth/register' exact component={Register} />
                <Route path='*' render={() => <h1 style={{ textAlign: 'center' }}>Page not found...</h1>} />
            </Switch>
        </StyledEngineProvider>
    );
};

export default App;