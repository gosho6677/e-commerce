import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserSalesThunk, selectAllSales } from "./salesSlice";

const UserSales = () => {
    const sales = useSelector(selectAllSales);
    const dispatch = useDispatch();
    console.log(sales);
    useEffect(() => {
        dispatch(getAllUserSalesThunk());
    }, [dispatch]);

    return (
        <div>
            hello mfer
        </div>
    );
};
 
export default UserSales;