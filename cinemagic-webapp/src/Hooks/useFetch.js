import { useState, useEffect } from 'react';
import baseUrl from '../config';

const useFetch = (url) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [refetchIndex, setRefetchIndex] = useState(0);

    useEffect(() => {
        const abortCont = new AbortController();
        setIsLoading(true);

        fetch(`${apiUrl}${url}`, {
            signal: abortCont.signal,
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then((res) => {
                if (res.data) {
                    setTotalItems(res.data.totalRecords);
                    setTotalPages(res.data.totalPages);
                    setData(res.data.pageContent ? res.data.pageContent : res.data);
                }
                setIsLoading(false);
                setError(null);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setIsLoading(false);
                    setError(err.message);
                }
            });

        return () => abortCont.abort();
    }, [url, refetchIndex]);


    const refetch = () => {
        setRefetchIndex(prev => prev + 1);
    };

    return { data, isLoading, error, totalPages, totalItems, refetch,  };
}

export default useFetch;
