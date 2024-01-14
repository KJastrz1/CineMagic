import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MovieForm from '../components/Movies/MovieForm';
import usePost from 'src/Hooks/usePost';
import ErrorText from 'components/UI/ErrorText';


function MovieAdd() {
    const { isPending, error, sendRequest } = usePost();

    const handleSave = async (values, resetForm) => {
        const formData = new FormData();
        formData.append('image', values.newImage);
        formData.append('title', values.title);
        formData.append('director', values.director);
        formData.append('description', values.description);

        sendRequest(`/Movie`, 'POST', formData, 'multipart').then((res) => {
         
            resetForm();
        });
    }; 

    return (
        <ScrollView style={styles.view}>
            <MovieForm onFormSubmit={handleSave} initialData={null} isPending={isPending} />
            {error && <ErrorText error={error} />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#212529',
    },
});
export default MovieAdd;
