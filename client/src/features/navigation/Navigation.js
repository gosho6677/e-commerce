import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navigation.css';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../auth/authSlice';

const Navigation = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.user.status);
    const user = useSelector(state => state.user.user);

    const logoutHandler = () => dispatch(logoutThunk());

    return (
        <Box sx={{ flexGrow: 1 }} component='nav'>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        <Link className='nav-buttons' to='/'>
                            E-commerce app
                        </Link>
                    </Typography>
                    {status === 'succeeded'
                        ? <>
                            <Link to='/cart' className='nav-buttons nav-cart' >
                                <ShoppingCartIcon />
                            </Link>
                            <Typography component='p'>
                                Welcome, {user.email}!
                            </Typography>
                            <Link to='/items/create' className='nav-buttons' >
                                CREATE
                            </Link>
                            <Button onClick={logoutHandler} className='nav-buttons' color='inherit'>
                                Logout
                            </Button>
                        </>
                        : <>
                            <Button color='inherit'>
                                <Link className='nav-buttons' to='/auth/login'>
                                    Login
                                </Link>
                            </Button>
                            <Button color='inherit'>
                                <Link className='nav-buttons' to='/auth/register'>
                                    Register
                                </Link>
                            </Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;