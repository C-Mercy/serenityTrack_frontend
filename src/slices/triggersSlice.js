// triggerApi.js
import {apiSlice}from './apiSlice';

export const triggerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTriggers: builder.query({
      query: () => '/api/v1/trigger',
    }),
    fetchTriggerById: builder.query({
      query: (triggerId) => `/api/v1/trigger/${triggerId}`,
    }),
    createTrigger: builder.mutation({
      query: (triggerData) => ({
        url: '/api/v1/trigger/create',
        method: 'POST',
        body: triggerData,
      }),
    }),
    updateTrigger: builder.mutation({
      query: ({ triggerId, triggerData }) => ({
        url: `/api/v1/trigger/update/${triggerId}`,
        method: 'PUT',
        body: triggerData,
      }),
    }),
    deleteTrigger: builder.mutation({
      query: (triggerId) => ({
        url: `/api/v1/trigger/delete/${triggerId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchTriggersQuery,
  useFetchTriggerByIdQuery,
  useCreateTriggerMutation,
  useUpdateTriggerMutation,
  useDeleteTriggerMutation,
} = triggerSlice;
