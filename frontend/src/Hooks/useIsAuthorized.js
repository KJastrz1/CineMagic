import SessionContext from 'Context/AuthContext';
import { useContext } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';


const useIsAuthorized = (allowedRoles) => {
    const isAuthenticated = useIsAuthenticated();
    const isAuth = isAuthenticated();


    const { role: userRole } = useContext(SessionContext);

    if (!isAuth) {
        return false;
    }

    if (Array.isArray(userRole)) {
        return userRole.some(role => allowedRoles.includes(role));
    } else {
        return allowedRoles.includes(userRole);
    }
};

export default useIsAuthorized;
