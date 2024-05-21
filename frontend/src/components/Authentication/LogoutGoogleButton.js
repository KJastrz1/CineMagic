import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

function LogoutGoogleButton() {
    const navigate = useNavigate();

    const onSuccess = () => {

        navigate('/login');
    }


    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}

            />
        </div>
    );
};

export default LogoutGoogleButton;
