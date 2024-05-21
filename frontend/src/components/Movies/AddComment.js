import usePost from 'Hooks/usePost';
import SessionContext from 'Providers/SessionProvider';
import Myspinner from 'components/Spinners/Myspinner';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddComment = ({ refetch }) => {
    const { userId, username } = useContext(SessionContext);
    const { id: movieId } = useParams();
    const [text, setText] = useState('');

    const { isPending, error, responseData, sendRequest } = usePost();

    const handleCommentChange = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setText(textarea.value);
    };

    if (error) {
        toast.error("Error adding comment");
    }


    const handleSubmit = () => {
        sendRequest(`/Comment`, 'POST', { text, userId, movieId }).then((res) => {
            setText('');
            refetch();
        });

    };

    const handleCancel = () => {
        setText('');
    };

    if (isPending) {
        return <Myspinner />;
    }

    return (
        <div>
            <textarea
                value={text}
                onChange={handleCommentChange}
                placeholder="Add your comment"
                className="form-control"
                style={{ overflowY: 'hidden' }}
            />
            <div className="d-flex justify-content-end mt-2">
                <button onClick={handleCancel} className="btn btn-outline-secondary me-2">Cancel</button>
                <button onClick={handleSubmit} className="btn btn-outline-success">Submit</button>
            </div>
        </div>
    );
};

export default AddComment;
