import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { selectCartItems } from './cartSlice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ReviewOrderStage = ({ shippingInfo, setStage }) => {
    const items = useSelector(selectCartItems);
    const cart = useSelector(state => state.cart.cart);
    return (
        <Paper elevation={3} className='cart-container'>
            <Typography variant='h4'>Order summary</Typography>
            <TableContainer component={Paper} className='review-order-list-items'>
                <Table className='review-order-list-items' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price per one</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row) => (
                            <TableRow
                                key={row.product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.product.name}
                                </TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">${row.product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <List className='review-order-list-shipping-info'>
                <ListItem>
                    <ListItemText primary={'Name:'} />
                    <Typography variant='body2'>{shippingInfo.name}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary={'Address:'} />
                    <Typography variant='body2'>{shippingInfo.address}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary={'City:'} />
                    <Typography variant='body2'>{shippingInfo.city}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary={'Phone number:'} />
                    <Typography variant='body2'>{shippingInfo.phone}</Typography>
                </ListItem>
            </List>
            <Typography variant='h5'>Total: ${cart.bill}</Typography>
            <Stack className='review-order-btns'>
                <Button onClick={() => setStage(1)} variant='outlined'>Back to cart</Button>
                <Button onClick={() => setStage(3)} variant='contained'>Place order</Button>
            </Stack>
        </Paper>
    );
};

export default ReviewOrderStage;