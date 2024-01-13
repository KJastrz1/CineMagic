import usePost from 'Hooks/usePost';
import React, { useEffect, useState } from 'react';
import MovieForm from '../components/Movies/MovieForm';

function MovieAdd() {



    const { isPending, error, responseData, sendRequest } = usePost();

    const handleSave = async (values, resetForm) => {
        const formData = new FormData();
        formData.append('image', values.newImage);
        formData.append('title', values.title);
        formData.append('director', values.director);
        formData.append('description', values.description);

        sendRequest(`/Movie`, 'POST', formData, 'multipart').then((res) => {
        
            resetForm(); 
        })
    };


    return (<>

        <MovieForm onFormSubmit={handleSave} initialData={null} isPending={isPending}  isEditMode={false}/>
    </>
    );
}

export default MovieAdd;
