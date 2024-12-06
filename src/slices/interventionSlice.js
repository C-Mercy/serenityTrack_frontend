// interventionApi.js
import apiSlice from './apiSlice';

export const interventionSlice= apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchInterventions: builder.query({
      query: () => '/api/v1/intervention',
    }),
    fetchInterventionById: builder.query({
      query: (interventionId) => `/api/v1/intervention/${interventionId}`,
    }),
    createIntervention: builder.mutation({
      query: (interventionData) => ({
        url: '/api/v1/intervention/create',
        method: 'POST',
        body: interventionData,
      }),
    }),
    updateIntervention: builder.mutation({
      query: ({ interventionId, interventionData }) => ({
        url: `/api/v1/intervention/update/${interventionId}`,
        method: 'PUT',
        body: interventionData,
      }),
    }),
    deleteIntervention: builder.mutation({
      query: (interventionId) => ({
        url: `/api/v1/intervention/delete/${interventionId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchInterventionsQuery,
  useFetchInterventionByIdQuery,
  useCreateInterventionMutation,
  useUpdateInterventionMutation,
  useDeleteInterventionMutation,
} = interventionSlice;
