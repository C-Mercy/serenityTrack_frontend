// Sample.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './slices/apiSlice';

const Sample = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.apiSlice.data);
    const status = useSelector((state) => state.apiSlice.status);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error loading data</div>;

    return (
        <div>
            {data.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};

export default Sample;