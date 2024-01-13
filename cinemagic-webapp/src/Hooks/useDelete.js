import { useState } from 'react';
import baseUrl from '../config';

const useDelete = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const sendDeleteRequest = (url) => {
        setIsPending(true);

        const abortCont = new AbortController();

        return new Promise((resolve) => {
            fetch(`${apiUrl}${url}`, {
                signal: abortCont.signal,
                method: 'DELETE',
                credentials: 'include'
            })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not delete the resource');
                    }
                    return res.json();
                })
                .then((res) => {
                    setIsPending(false);
                    setError(null);
                    resolve(res);
                })
                .catch(err => {
                    if (err.name !== 'AbortError') {
                        setIsPending(false);
                        setError(err.message);
                    }
                });

            return () => abortCont.abort();
        });
    };

    return { sendDeleteRequest, isPending, error };
};

export default useDelete;
