import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {apiSlice} from "./apiSlice";

const profileApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    fetchProfiles: builder.query({
      query: () => '/api/v1/profile',
    }),
    fetchProfileById: builder.query({
      query: (profileId) => `/api/v1/profile/${profileId}`,
    }),
    createProfile: builder.mutation(
        { query: ({ profileData, userId }) =>
              ({ url: `/api/v1/create_profile`,
                // Ensure userId is correctly used here
                method: 'POST', body: profileData, }),

        }),
    updateProfile: builder.mutation(
        { query: ({ profileData, userId, profileId }) =>
              ({ url: `/api/v1/profile/${profileId}/update/`,
                // Adjust URL to match your API
                 method: 'PUT', body: profileData, }), }),
    deleteProfile: builder.mutation({
      query: (profileId) => ({
        url: `/api/v1/profile/delete/${profileId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchProfilesQuery,
  useFetchProfileByIdQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileApi;

export default profileApi;
