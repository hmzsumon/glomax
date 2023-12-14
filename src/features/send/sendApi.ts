import { apiSlice } from '../api/apiSlice';

export const sendApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		send: builder.mutation({
			query: (body) => ({
				url: '/send-usdt',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useSendMutation } = sendApi;
