import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MainButton from './MainButton';

const PageButtons = ({ currentPage, onPageChange, totalPages }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
      <View style={styles.container}>
            <MainButton title={'Previous'} onPress={handlePrevious} disabled={currentPage <= 1}/>

            <Text style={styles.text}>{currentPage}</Text>

            <MainButton title={'Next'} onPress={handleNext} disabled={currentPage >=totalPages}/>
       </View>
    );
};

export default PageButtons;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#212529',
    },
    text: {
        color: '#28a745',
        textAlign: 'center', 
        fontSize: 16,
        marginHorizontal: 10, 
    },
});
