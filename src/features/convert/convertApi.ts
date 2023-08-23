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
			invalidatesTags: ['User', 'Convert'],
		}),

		// get logged in user convert records
		myConvertRecords: builder.query({
			query: () => `/convert-records`,
			providesTags: ['Convert'],
		}),
	}),
});

export const { useConvertMutation, useMyConvertRecordsQuery } = convertApi;
