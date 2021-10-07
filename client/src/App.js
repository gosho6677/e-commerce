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

const App = () => {
    const error = useSelector(state => state.user.error);

    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            {error && <ErrorBox error={error} />}
            <Navigation />
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/auth/login' exact component={Login} />
                <Route path='/auth/register' exact component={Register} />
                <Route path='/test' exact component={Counter} />
                <Route path='*' render={() => <h1 style={{textAlign: 'center'}}>Page not found...</h1>} />
            </Switch>
        </StyledEngineProvider>
    );
};

export default App;