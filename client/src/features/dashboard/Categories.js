import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useHistory } from 'react-router-dom';

const Categories = () => {
    const history = useHistory();

    // currentTarget in this case is the tag on which the onClick event is attached,
    // while e.target it would be the svg or span or w/e
    // and this allows to use the dataset to redirect and change the content
    const routeHandler = e => history.push(`/${e.currentTarget.dataset.category}`);

    return (
        <Paper className='dashboard-categories' elevation={6}>
            <Box sx={{ width: '100%', maxWidth: 360 }}>
                <Typography variant='h5' sx={{ p: 2}}>Category: </Typography>
                <Divider />
                    <List>
                        <ListItem disablePadding data-category="laptops" onClick={routeHandler}>
                            <ListItemButton>
                                <LaptopMacIcon />
                                <ListItemText primary="Laptops" />
                                <ArrowForwardIosIcon />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding data-category="tablets" onClick={routeHandler}>
                            <ListItemButton component="div">
                                <TabletMacIcon />
                                <ListItemText primary="Tablets" />
                                <ArrowForwardIosIcon />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding data-category="phones" onClick={routeHandler}>
                            <ListItemButton component="div">
                                <PhoneIphoneIcon />
                                <ListItemText primary="Phones" />
                                <ArrowForwardIosIcon />
                            </ListItemButton>
                        </ListItem>
                    </List>
            </Box>
        </Paper>
    );
};

export default Categories;