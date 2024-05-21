import useIsAuthorized from 'Hooks/useIsAuthorized';
import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ Component, allowedRoles }) => {

    const hasRequiredRole = useIsAuthorized(allowedRoles);


    return hasRequiredRole ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
