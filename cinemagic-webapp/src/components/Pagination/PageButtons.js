import React from 'react';

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
        <div className="d-flex align-items-center justify-content-center">
            <button className='btn btn-outline-success me-2' onClick={handlePrevious} disabled={currentPage <= 1}>Previous</button>

            <span className='mx-2'>{currentPage}</span>

            <button className='btn btn-outline-success ms-2' onClick={handleNext} disabled={currentPage >= totalPages}>Next</button>
        </div>
    );
};

export default PageButtons;
