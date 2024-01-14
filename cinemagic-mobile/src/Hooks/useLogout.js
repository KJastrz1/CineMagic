import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { SessionContext } from "src/Providers/SessionProvider";
import * as SecureStore from 'expo-secure-store';

export const useLogout = () => {
    const { role, setRole, setEmail, setUserId, setUsername } = useContext(SessionContext);

    const logout = async () => {
        await setRole(null);
        await setEmail(null);
        await setUserId(null);
        await setUsername(null);
        await SecureStore.setItemAsync('token', '');
  

        console.log(role);
    };




    return { logout };
};
