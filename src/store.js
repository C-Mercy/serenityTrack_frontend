import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice'; // Replace with the correct path to your API slice

const store = configureStore({
  reducer: {
    // Add your other reducers here
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
