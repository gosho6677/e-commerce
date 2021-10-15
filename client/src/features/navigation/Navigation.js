import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
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
import { useState } from 'react';

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

    // avatar clickable functionality
    // code copied from mui.com
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                            <Link to='/items/create' className='nav-buttons' >
                                CREATE
                            </Link>

                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                        <Avatar
                                            sx={{ width: 42, height: 42 }}
                                            srcSet={user?.imageUrl}
                                            alt="profile pic"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={() => history.push('/my-orders')}>
                                    <Avatar /> My orders
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={logoutHandler}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
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