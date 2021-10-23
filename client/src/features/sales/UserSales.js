import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserSalesThunk, selectAllSales } from "./salesSlice";
import LoadingSpinner from '../loading/LoadingSpinner';

const UserSales = () => {
    const salesStatus = useSelector(state => state.sales.status);
    const sales = useSelector(selectAllSales);
    const dispatch = useDispatch();
    console.log(sales);

    useEffect(() => {
        dispatch(getAllUserSalesThunk());
    }, [dispatch]);

    const sendProductHandler = (productId) => () => {
        // TODO: change sale status to completed in DB
        console.log(productId);
    };

    if (salesStatus === 'loading') {
        return <LoadingSpinner />;
    }

    return (
        <TableContainer component={Paper} sx={{ width: '95%', margin: '10px auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price per one</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="center">Delivery address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sales.length
                        ? sales.map(sale => {
                            return (
                                <TableRow
                                    key={sale._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {sale.product.name}
                                    </TableCell>
                                    <TableCell align="right">{sale.quantity}</TableCell>
                                    <TableCell align="right">${sale.product.price}</TableCell>
                                    <TableCell align="right">
                                        {sale.status === 'pending'
                                            ? <>
                                                <Typography variant='subtitle1'>pending</Typography>
                                                <Button onClick={sendProductHandler(sale._id)} variant='contained'>
                                                    SEND
                                                </Button>
                                            </>
                                            : 'completed'}
                                    </TableCell>
                                    <TableCell align="left">
                                        <b>Name:</b>{sale.deliveryAddress.name}<br />
                                        <b>Address:</b>{sale.deliveryAddress.address}<br />
                                        <b>City:</b>{sale.deliveryAddress.city}<br />
                                        <b>Phone:</b> {sale.deliveryAddress.phone}
                                    </TableCell>
                                </TableRow>

                            );
                        })
                        : <Typography variant='h3'>'You have no sales yet!'</Typography>}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserSales;