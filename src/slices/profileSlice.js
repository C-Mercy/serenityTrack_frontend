import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const profileApi = createApi({
  reducerPath: 'profileApi', // Unique name for this API slice
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    fetchProfiles: builder.query({
      query: () => '/api/v1/profile',
    }),
    fetchProfileById: builder.query({
      query: (profileId) => `/api/v1/profile/${profileId}`,
    }),
    createProfile: builder.mutation({
      query: (profileData) => ({
        url: '/api/v1/profile/create',
        method: 'POST',
        body: profileData,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ profileId, profileData }) => ({
        url: `/api/v1/profile/update/${profileId}`,
        method: 'PUT',
        body: profileData,
      }),
    }),
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
