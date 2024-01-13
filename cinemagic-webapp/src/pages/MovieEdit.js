import { AdvancedImage } from '@cloudinary/react';
import useFetch from 'Hooks/useFetch';
import usePost from 'Hooks/usePost';
import Myspinner from 'components/Spinners/Myspinner';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import MovieForm from '../components/Movies/MovieForm';
import { toast } from 'react-toastify';


function MovieEdit() {
    let { id: movieId } = useParams();
    const navigate = useNavigate(); 
  
    const { data, error: fetchError, isLoading } = useFetch(`/Movie/${movieId}`); 
  

    const { isPending, error, responseData, sendRequest } = usePost();

    const handleSave = async (values,resetForm) => {

        const formData = new FormData();
        formData.append('image', values.newImage);
        formData.append('title', values.title);
        formData.append('director', values.director);
        formData.append('description', values.description);

        sendRequest(`/Movie/${movieId}`, 'PUT', formData, 'multipart'
        ).then((res) => {
            navigate(`/movie/${movieId}`);
        })
    };
   

    return (<>
    {error && <div>{error}</div>}
    {fetchError && <div>{fetchError}</div>}
        {isLoading && <Myspinner />}
        {data &&
            <MovieForm onFormSubmit={handleSave} initialData={data}  isPending={isPending} isEditMode={true}/>}


    </>
    );
}

export default MovieEdit;
