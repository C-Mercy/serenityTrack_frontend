import {apiSlice }from './apiSlice'; // Importing the central apiSlice

export const episodeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEpisodes: builder.query({
      query: () => '/api/v1/episode', // Fetch all episodes
    }),
    fetchEpisodeById: builder.query({
      query: (episodeId) => `/api/v1/episode/${episodeId}`, // Fetch an episode by ID
    }),
    createEpisode: builder.mutation({
      query: (episodeData) => ({
        url: '/api/v1/episode/create', // Path for creating an episode
        method: 'POST',
        body: episodeData,
      }),
    }),
    updateEpisode: builder.mutation({
      query: ({ episodeId, episodeData }) => ({
        url: `/api/v1/episode/update/${episodeId}`, // Path to update an episode
        method: 'PUT',
        body: episodeData,
      }),
    }),
    deleteEpisode: builder.mutation({
      query: (episodeId) => ({
        url: `/api/v1/episode/delete/${episodeId}`, // Path for deleting an episode
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchEpisodesQuery,
  useFetchEpisodeByIdQuery,
  useCreateEpisodeMutation,
  useUpdateEpisodeMutation,
  useDeleteEpisodeMutation,
} = episodeSlice;
