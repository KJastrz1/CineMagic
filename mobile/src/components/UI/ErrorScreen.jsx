import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ErrorScreen = ({error}) => {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.errorText}>{error}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        margin: 10,
        fontSize: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212529',
    },
});
export default ErrorScreen;
