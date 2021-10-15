import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navigation.css';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../auth/authSlice';
import { selectCartItems } from '../cart/cartSlice';

const Navigation = () => {
    const status = useSelector(state => state.user.status);
    const user = useSelector(state => state.user.user);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = () => {
        dispatch(logoutThunk());
        history.push('/');
    };

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
                            <Link to='/cart' className='nav-buttons nav-cart'>
                                <Badge color='secondary' badgeContent={cartItems?.length || 0}>
                                    <ShoppingCartIcon />
                                </Badge>
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