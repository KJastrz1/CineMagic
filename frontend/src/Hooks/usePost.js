import { useEffect, useState } from 'react';
import baseUrl from '../config';

const usePost = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const sendRequest = (url, method, data, contentType = 'json') => {
        setIsPending(true);
        const abortCont = new AbortController();

        let fetchHeaders = new Headers();
        let body = contentType === 'json' ? JSON.stringify(data) : data;

        if (contentType === 'json') {
            fetchHeaders.append("Content-Type", "application/json");
        }

        return new Promise((resolve) => {
            fetch(`${apiUrl}${url}`, {
                signal: abortCont.signal,
                method: method,
                headers: fetchHeaders,
                credentials: 'include',
                body: body
            })
                .then(res => {
                    setIsPending(false);
                    if (!res.ok) {
                        if (res.status === 400) {
                            return res.json().then(errData => {
                                throw Error(errData.message);
                            });
                        } else {
                            throw Error('Something went wrong, please try again later.');
                        }
                    }
                    return res.json();
                })
                .then(res => {
                    setError(null);
                    setResponseData(res);
                    resolve(res);
                })
                .catch(err => {
                    if (err.name !== 'AbortError') {
                        setError(err.message);
                    }
                });
        });
    };

    return { sendRequest, responseData, isPending, error };
};

export default usePost;
