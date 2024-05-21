import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
    const [role, setRoleState] = useState(localStorage.getItem('role'));
    const [email, setEmailState] = useState(localStorage.getItem('email'));
    const [userId, setUserIdState] = useState(localStorage.getItem('userId'));
    const [username, setUsernameState] = useState(localStorage.getItem('username'));


    const setRole = (newRole) => {
        localStorage.setItem('role', newRole);
        setRoleState(newRole);
    };

    const setEmail = (newEmail) => {
        localStorage.setItem('email', newEmail);
        setEmailState(newEmail);
    };

    const setUserId = (newUserId) => {
        localStorage.setItem('userId', newUserId);
        setUserIdState(newUserId);
    };

    const setUsername = (newUsername) => {
        localStorage.setItem('username', newUsername);
        setUsernameState(newUsername);
    };

    const value = { role, email, userId, username, setRole, setEmail, setUserId, setUsername };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};


export default SessionContext;
