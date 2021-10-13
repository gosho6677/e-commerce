import Container from '@mui/material/Container';
import './Dashboard.css';

import Categories from "./Categories";
import Items from '../items/Items';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner';

const Dashboard = () => {
    const itemStatus = useSelector(state => state.items.status);

    if(itemStatus === 'loading') {
        return <LoadingSpinner />;
    }

    return (
        <Container component='main' className='dashboard-container'>
            <Categories />
            <Items />
        </Container>
    );
};

export default Dashboard;