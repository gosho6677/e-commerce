import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { getAllItemsThunk } from '../features/dashboard/items/itemsSlice';

const useGetItemsIfIdle = () => {
    const itemsStatus = useSelector(state => state.items.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if (itemsStatus === 'idle') {
            dispatch(getAllItemsThunk());
        }
    }, [dispatch, itemsStatus]);
};

export default useGetItemsIfIdle;