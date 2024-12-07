import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base query with a base URL and prepareHeaders function
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000', // Adjust this base URL as needed
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
    if (token) {
      headers.set('Authorization', `Bearer ${token}`); // Set the Authorization header
    }
    return headers;
  },
});

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api', // Optional, but good practice to define a unique reducer path
  baseQuery,
  tagTypes: ['users'], // Define tag types for invalidation
  endpoints: (builder) => ({


  }),
});



// Export the reducer to be included in the store
export default apiSlice.reducer;