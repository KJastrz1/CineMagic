import usePost from 'Hooks/usePost';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { useLogin } from '../../Hooks/useLogin';

const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

function LoginGoogleButton() {
    const { responseData, isPending, error, sendRequest } = usePost();

    const onSuccess = (res) => {
        sendRequest('/Auth/google', 'POST', { tokenId: res.tokenId }, 'json');

    }
    const onFailure = (res) => {
        return <div>Something went wrong</div>
    }

    useLogin(responseData);


    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
};

export default LoginGoogleButton;
