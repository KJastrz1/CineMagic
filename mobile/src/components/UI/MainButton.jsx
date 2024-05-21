import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const MainButton = ({ onPress, title, ...props }) => (
    <TouchableOpacity onPress={onPress} style={styles.button} {...props}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#28a745', 
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    buttonText: {
        color: '#28a745', 
        fontSize: 16,
        textAlign: 'center',
    },
});

export default MainButton;
