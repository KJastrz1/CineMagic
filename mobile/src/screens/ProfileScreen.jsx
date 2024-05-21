import MainButton from 'components/UI/MainButton';
import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useLogout } from 'src/Hooks/useLogout';
import { SessionContext } from 'src/Providers/SessionProvider';


const ProfileScreen = () => {
    const { email, username, role } = useContext(SessionContext);
    const { logout } = useLogout();

    return (
        <View style={styles.view}>
            <Text style={styles.textLarge}>Hello, {username}</Text>
            <Text style={styles.textSmall}>Your role: {role}</Text>
            <MainButton title="Logout" onPress={logout} />
        </View>
    );
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#212529',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLarge: {
        fontSize: 24, 
        color: 'white',
        marginBottom: 10, 
    },
    textSmall: {
        fontSize: 18, 
        color: 'white',
    },
});

export default ProfileScreen;
