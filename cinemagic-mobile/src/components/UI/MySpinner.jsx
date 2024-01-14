import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const MySpinner = () => {
    return (
        <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212529',
    },
});

export default MySpinner;
