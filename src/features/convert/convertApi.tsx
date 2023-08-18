import { apiSlice } from '../api/apiSlice';

export const convertApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create a new convert
		convert: builder.mutation({
			query: (data) => ({
				url: `convert`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useConvertMutation } = convertApi;
