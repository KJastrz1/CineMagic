
import React, { createContext, useState, useEffect } from 'react';
import { storeDataInStorage, getDataFromStorage } from './AsyncStorage'

export const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
    const [role, setRoleState] = useState(null);
    const [email, setEmailState] = useState(null);
    const [userId, setUserIdState] = useState(null);
    const [username, setUsernameState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const isAuth = email && role && userId && username;
    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const storedRole = await getDataFromStorage('role');
                const storedEmail = await getDataFromStorage('email');
                const storedUserId = await getDataFromStorage('userId');
                const storedUsername = await getDataFromStorage('username');

                if (storedRole) setRoleState(storedRole);
                if (storedEmail) setEmailState(storedEmail);
                if (storedUserId) setUserIdState(storedUserId);
                if (storedUsername) setUsernameState(storedUsername);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }

        };

        loadStoredData();
    }, []);

    const setRole = async (newRole) => {
        try {
            await storeDataInStorage('role', newRole);
            setRoleState(newRole);
        } catch (e) {
            throw Error(e.message);
        }
    };

    const setEmail = async (newEmail) => {
        try {
            await storeDataInStorage('email', newEmail);
            setEmailState(newEmail);
        } catch (e) {
            throw Error(e.message);
        }
    };

    const setUserId = async (newUserId) => {
        try {
            await storeDataInStorage('userId', newUserId);
            setUserIdState(newUserId);
        } catch (e) {
            throw Error(e.message);
        }
    };

    const setUsername = async (newUsername) => {
        try {
            await storeDataInStorage('username', newUsername);
            setUsernameState(newUsername);
        } catch (e) {
            throw Error(e.message);
        }
    };


    const value = { isAuth, isLoading, role, email, userId, username, setRole, setEmail, setUserId, setUsername };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};
