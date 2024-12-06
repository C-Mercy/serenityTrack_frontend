import {apiSlice} from "./apiSlice";

export const sessionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSessions: builder.query({
      query: () => '/api/v1/session', // Fetch all sessions
    }),
    fetchSessionById: builder.query({
      query: (sessionId) => `/api/v1/session/${sessionId}`, // Fetch a session by ID
    }),
    createSession: builder.mutation({
      query: (sessionData) => ({
        url: '/api/v1/session/create', // Path for creating a session
        method: 'POST',
        body: sessionData,
      }),
    }),
    updateSession: builder.mutation({
      query: ({ sessionId, sessionData }) => ({
        url: `/api/v1/session/update/${sessionId}`, // Path to update a session
        method: 'PUT',
        body: sessionData,
      }),
    }),
    deleteSession: builder.mutation({
      query: (sessionId) => ({
        url: `/api/v1/session/delete/${sessionId}`, // Path for deleting a session
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchSessionsQuery,
  useFetchSessionByIdQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = sessionSlice;
