import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from 'Hooks/useFetch';
import StarRating from 'components/UI/Rating/StarRating';
import React, { useEffect, useState } from 'react';

const MovieRating = ({ movieId, userId }) => {
    const [refetchToggle, setRefetchToggle] = useState(false);
    const { data: movieRating, isLoading: isLoadingMovieRating, error: errorMovieRating, refetch } = useFetch(`/Rating/${movieId}`);

    const { data: userRating, isLoading: isLoadingUserRating, error: errorUserRating, refetch: refetchUser } = useFetch(`/Rating/${movieId}/${userId}`);


    useEffect(() => {
        if (refetchToggle) {
            refetch();
            refetchUser();
            setRefetchToggle(false);
        }
    }, [refetchToggle]);

    if (isLoadingUserRating || isLoadingMovieRating) return <p>Loading...</p>;
    if (errorMovieRating || errorUserRating) {   
        return <p>Error loading rating</p>;
    }
    return (
        <div className='d-flex align-items-left ms-2 mt-2 mb-3'>
            <span className='text ms-1'>
                <FontAwesomeIcon icon={faStar} style={{ color: "#f2d307", marginRight: "5px" }} />
                {movieRating.rating ? movieRating.rating : "No rating yet"} ({movieRating.numberOfRatings})
                <StarRating movieId={movieId} value={userRating.rating !== -1 ? userRating.rating : 0} setRefetchToggle={setRefetchToggle} />
            </span>
        </div>
    );
};

export default MovieRating;
