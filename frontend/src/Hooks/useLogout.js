
import SessionContext from "Context/AuthContext";
import { useContext } from "react";
import {  useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const { setRole, setEmail, setUserId, setUsername } = useContext(SessionContext);
    const navigate = useNavigate();
    const signOut = useSignOut();

    const logout = () => {
        if (window.gapi && window.gapi.auth2) {
            const auth2 = window.gapi.auth2.getAuthInstance();
            if (auth2) {
                auth2.signOut().then(() => {                   
                    completeLogout(); 
                });
            }
        } else {
            completeLogout(); 
        }
    };

    const completeLogout = () => {
        signOut();
        setRole(null);
        setEmail(null);
        setUserId(null);
        setUsername(null);
        navigate('/login');
    };

    return { logout };
};
