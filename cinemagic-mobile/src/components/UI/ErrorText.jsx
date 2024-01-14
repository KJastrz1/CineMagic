import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ErrorText = ({error}) => {
    return (
      
        <Text style={styles.errorText}>{error}</Text>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        margin: 10,
    },
});
export default ErrorText;
