import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base query
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000', // Adjust this base URL as needed

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