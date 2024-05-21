import useFetch from 'Hooks/useFetch';

import PageButtons from 'components/Pagination/PageButtons';

import React, { useContext, useState } from 'react';

import AddComment from './AddComment';

const Comments = ({ movieId }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);


    const [url, setUrl] = useState(`/Comment/${movieId}/search/${page}/${pageSize}`);

    const { data, isLoading, error, totalPages, totalItems, refetch } = useFetch(url);
    const [totalComments, setTotalComments] = useState(0);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setUrl(`/Comment/${movieId}/search/${newPage}/${pageSize}`);
    };

    const formatDate = (timestamp) => {   
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) +
            ' at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
        return formattedDate;
    };
    
    if(totalItems !== totalComments) {
        setTotalComments(totalItems);
    }

    return (
        <div>
            {error && <div>{error}</div>}
            {!isLoading && !error && data && (
                <div>
                    <AddComment refetch={refetch} />

                    <h2>Comments ({totalComments})</h2>
                    {data.map((comment) => (
                        <div key={comment.id} className="row mb-3">
                            <div className="col">
                                <div className="d-flex justify-content-between">
                                    <span className="fw-bold">{comment.username}</span>
                                    <span >{formatDate(comment.timestamp)}</span>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-center">
                        <PageButtons totalPages={totalPages} onPageChange={handlePageChange} currentPage={page} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;
