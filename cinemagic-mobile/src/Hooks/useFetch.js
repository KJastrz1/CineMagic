import { useState, useEffect } from 'react';
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [refetchIndex, setRefetchIndex] = useState(0);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = await SecureStore.getItemAsync('token');
                if (!token) {             
                    return;
                }
           
                const response = await fetch(`${API_URL}${url}`, {
                    signal: abortCont.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw Error('Something went wrong, try again later');
                }

                const res = await response.json();
                if (res.data) {
                    setTotalItems(res.data.totalRecords);
                    setTotalPages(res.data.totalPages);
                    setData(res.data.pageContent ? res.data.pageContent : res.data);
                }
                setIsLoading(false);
                setError(null);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => abortCont.abort();
    }, [url, refetchIndex]);

    const refetch = () => setRefetchIndex(prev => prev + 1);

    return { data, isLoading, error, totalPages, totalItems, refetch };
}

export default useFetch;
