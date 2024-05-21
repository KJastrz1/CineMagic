import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const BaseInput = ({ ...props }) => {
    return (
        <TextInput style={styles.input} placeholderTextColor="white" {...props} />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 4,
        color: 'white',
    },
});

export default BaseInput;
