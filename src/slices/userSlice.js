import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {apiSlice} from "./apiSlice";

const userSlice = apiSlice.injectEndpoints({
  reducerPath:"profileApi",

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/token/login',  // Login endpoint
        method: 'POST',
        body: credentials,  // Pass the credentials (username and password)
      }),
      // Handle successful response here directly
      // The response data will be used in the component where you call the mutation
    }),
    refresh: builder.mutation({
      query: (refreshToken) => ({
        url: '/api/token/refresh/',
        method: 'POST',
        body: { refresh: refreshToken },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/token/logout/',
        method: 'POST',
      }),
    }),
    fetchUsers: builder.query({
        query: () => '/api/v1/user',
      }),
      // Fetch a single user by ID
      fetchUserById: builder.query({
        query: (userId) => `/api/v1/user/${userId}`,
      }),
      // Create a new user
      createUser: builder.mutation({
        query: (userData) => ({
          url: '/api/v1/user/create',
          method: 'POST',
          body: userData,
        }),
      }),
      // Update an existing user
      updateUser: builder.mutation({
        query: ({ userId, userData }) => ({
          url: `/api/v1/user/update/${userId}`,
          method: 'PUT',
          body: userData,
        }),
      }),
      // Delete a user
      deleteUser: builder.mutation({
        query: (userId) => ({
          url: `/api/v1/user/delete/${userId}`,
          method: 'DELETE',
        }),
      }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useFetchUserByIdQuery,
  useFetchUsersQuery,
  useUpdateUserMutation,
} = userSlice;

export default userSlice;
