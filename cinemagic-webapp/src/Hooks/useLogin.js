import SessionContext from "Providers/SessionProvider";
import { useContext, useEffect } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export const useLogin = (responseData) => {
    const { setRole, setEmail, setUserId, setUsername } = useContext(SessionContext);
    const signIn = useSignIn();
    const navigate = useNavigate();

    useEffect(() => {
        if (responseData && responseData.success) {
            const { jwtToken, email, role, userId, username } = responseData.data;
            setRole(role);
            setEmail(email);
            setUserId(userId);
            setUsername(username);

            if (signIn({
                token: jwtToken,
                expiresIn: 1440,
                tokenType: "Bearer",
                authState: { email: email },
            })) {
                navigate('/movies');
            } else {
              
            }
         
        }
    }, [responseData]);
};
