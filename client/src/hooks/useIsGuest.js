import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const useIsGuest = () => {
    const history = useHistory();

    const status = useSelector(state => state.user.status);

    useEffect(() => {
        if (status === 'succeeded') {
            history.push('/');
        }
    }, [history, status]);
};

export default useIsGuest;