import React from 'react';

const SpinnerButton = () => {
    return (
        <button className="btn btn-outline-success" type="button" disabled>
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    );
};

export default SpinnerButton;
