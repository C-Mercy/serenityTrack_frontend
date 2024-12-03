// src/slices/apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('apiSlice/fetchData', async () => {
    const response = await fetch('http://localhost:8000');
    return response.json();
});

const apiSlice = createSlice({
    name: 'apiSlice',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default apiSlice.reducer;