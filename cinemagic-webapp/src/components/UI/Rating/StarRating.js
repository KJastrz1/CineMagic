import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePost from 'Hooks/usePost';
import SessionContext from 'Providers/SessionProvider';
import React, { useContext, useEffect, useState } from 'react';
import './StarRating.css';

const StarRating = ({ movieId, value, setRefetchToggle }) => {
    const [rating, setRating] = useState(value);
    const [hover, setHover] = useState(0);
    const { userId } = useContext(SessionContext);
    const { isPending, error: postError, sendRequest } = usePost();

    const onSubmit = () => {
        sendRequest(`/Rating`, 'POST', { rating, userId, movieId }).then((res) => {
            setRefetchToggle(true);
        });

    }

    return (
        <div>
            {[...Array(10)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            style={{ display: 'none' }}
                        />
                        <span
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(rating)}
                            style={{ cursor: 'pointer' }}
                        >
                            <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: ratingValue <= (hover || rating) ? '#f2d307' : 'gray', marginRight: '5px' }}
                            />
                        </span>
                    </label>
                );
            })}
            <button className="btn btn-outline-gold ms-3" onClick={onSubmit} disabled={isPending || rating === 0}>Rate</button>
            {postError && <div>Error submitting rating</div>}
        </div>
    );
};

export default StarRating;
