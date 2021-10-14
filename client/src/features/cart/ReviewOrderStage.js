import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

const ReviewOrderStage = ({ changeStageHandler }) => {
    return (
        <Paper elevation={3} className='cart-container'>
            <Typography variant='h4'>Order summary</Typography>
            <List className='review-order-list-items'>
                <ListItem>
                    <ListItemText primary={'Iphone'} />
                    <ListItemText primary={'Quantity: 2'} />
                    <Typography variant="body2">{'$1999'}</Typography>
                </ListItem>
                <ListItem >
                    <ListItemText primary={'Iphone'} />
                    <ListItemText primary={'Quantity: 2'} />
                    <Typography variant="body2">{'$1999'}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary={'Iphone'} />
                    <ListItemText primary={'Quantity: 2'} />
                    <Typography variant="body2">{'$1999'}</Typography>
                </ListItem>
            </List>
            <List className='review-order-list-shipping-info'>
                <ListItem>
                    <ListItemText primary={'Name:'} />
                    <Typography variant="body2">{'Georgi Palovaki'}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary={'Address:'} />
                    <Typography variant="body2">{'Street Mladost 25'}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary={'City:'} />
                    <Typography variant="body2">{'Ilienci'}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary={'Phone number:'} />
                    <Typography variant="body2">{'0988234214'}</Typography>
                </ListItem>
            </List>
            <Typography variant='h5'>Total: $2200</Typography>
            <Stack className='review-order-btns'>
                <Button onClick={changeStageHandler(2)} variant='outlined'>Back</Button>
                <Button onClick={changeStageHandler(3)} variant='contained'>Place order</Button>
            </Stack>
        </Paper>
    );
};

export default ReviewOrderStage;