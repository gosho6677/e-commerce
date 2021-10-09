import Container from '@mui/material/Container';
import './Dashboard.css';

import Categories from "./Categories";
import Items from './Items';

const Dashboard = () => {
    return (
        <Container component='main' className='dashboard-container'>
            <Categories />
            <Items />
        </Container>
    );
};

export default Dashboard;