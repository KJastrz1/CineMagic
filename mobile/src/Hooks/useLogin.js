import { useContext, useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { SessionContext } from "src/Providers/SessionProvider";

export const useLogin = (responseData) => {
    const { setRole, setEmail, setUserId, setUsername } = useContext(SessionContext);
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState(null);

    useEffect(() => {
        const storeData = async () => {
            if (responseData && responseData.success) {
                setIsLoadingLogin(true);
                const { jwtToken, email, role, userId, username } = responseData.data;

                try {
                   
                    await setRole(role);
                    await setEmail(email);
                    await setUserId(userId);
                    await setUsername(username);
                    
                    await SecureStore.setItemAsync('token', jwtToken);
              
                } catch (error) {                  
                    setErrorLogin("Error during login process, try again later");              
                }
                finally {
                    setIsLoadingLogin(false);
                }
            }
        }
        storeData();
    }, [responseData, setRole, setEmail, setUserId, setUsername]);

    return { isLoadingLogin, errorLogin };
};
