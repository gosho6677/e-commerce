import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const isAuth = WrappedComponent => {
    const Component = props => {
        const history = useHistory();
        const userStatus = useSelector(state => state.user.status);

        if(userStatus === 'idle') {
            history.push('/auth/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return Component;
};

export default isAuth;