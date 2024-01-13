import React from 'react';

const Toast = (title, text) => {
    return (

        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="mr-auto">{title}</strong>
                <small>{text}</small>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                {text}
            </div>
        </div>
    );
};

export default Toast;
