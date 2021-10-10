import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import { Counter } from './features/counter/Counter';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Navigation from './features/navigation/Navigation';
import { useSelector } from 'react-redux';
import ErrorBox from './features/errors/ErrorBox';
import Create from './features/items/Create';
import Details from './features/items/Details';

const App = () => {
    const userError = useSelector(state => state.user.error);
    const itemsError = useSelector(state => state.items.error);

    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            {(itemsError || userError) && <ErrorBox itemsError={itemsError} userError={userError} />}
            <Navigation />
            <Switch>
                <Route path='/' exact component={Dashboard} />
                {/* <Route path='/cart' exact component={Cart} /> */}
                <Route path='/items/create' exact component={Create} />
                <Route path='/items/details/:id' exact component={Details} />
                <Route path='/auth/login' exact component={Login} />
                <Route path='/auth/register' exact component={Register} />
                <Route path='/test' exact component={Counter} />
                <Route path='*' render={() => <h1 style={{textAlign: 'center'}}>Page not found...</h1>} />
            </Switch>
        </StyledEngineProvider>
    );
};

export default App;