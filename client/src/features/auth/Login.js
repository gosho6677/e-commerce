import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './auth.css';

import { Link } from 'react-router-dom';

const Login = () => {

    const registerHandler = e => {
        e.preventDefault();

        console.log(e.target.email.value)
        console.log(e.target.password.value)
    };

    return (
        <Paper elevation={3} component='section' className='login-register-section'>
            <Typography variant='h4' sx={{ textAlign: 'center', pt: '2%' }}>
                Login
            </Typography>
            <Box onSubmit={registerHandler} component='form' className='login-register-box'>
                <TextField
                    margin='normal'
                    required
                    className='login-register-input'
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    className='login-register-input'
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                />
                <Button
                    type='submit'
                    variant='contained'
                    className='login-register-btn'
                >
                    Sign in
                </Button>
                <Link to='/auth/register' style={{ textAlign: 'center', marginBottom: '10px'}}>
                  Don't have an account? Sign Up
                </Link>
            </Box>
        </Paper>
    );
};

export default Login;