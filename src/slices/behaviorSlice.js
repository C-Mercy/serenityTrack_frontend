// behaviorApi.js
import {apiSlice} from './apiSlice';

export const behaviorSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBehaviors: builder.query({
      query: () => '/api/v1/behavior',
    }),
    fetchBehaviorById: builder.query({
      query: (behaviorId) => `/api/v1/behavior/${behaviorId}`,
    }),
    createBehavior: builder.mutation({
      query: (behaviorData) => ({
        url: '/api/v1/behavior/create',
        method: 'POST',
        body: behaviorData,
      }),
    }),
    updateBehavior: builder.mutation({
      query: ({ behaviorId, behaviorData }) => ({
        url: `/api/v1/behavior/update/${behaviorId}`,
        method: 'PUT',
        body: behaviorData,
      }),
    }),
    deleteBehavior: builder.mutation({
      query: (behaviorId) => ({
        url: `/api/v1/behavior/delete/${behaviorId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchBehaviorsQuery,
  useFetchBehaviorByIdQuery,
  useCreateBehaviorMutation,
  useUpdateBehaviorMutation,
  useDeleteBehaviorMutation,
} = behaviorSlice;
