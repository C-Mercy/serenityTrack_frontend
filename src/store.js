import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // Ensure logger is imported correctly
import apiSlice from './slices/apiSlice';
import authenticationReducer from './slices/authSlice';
import profileApi from './slices/profileSlice';

const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    
    authentication: authenticationReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(logger,profileApi.middleware), // Correctly adding logger middleware
});

export default store;