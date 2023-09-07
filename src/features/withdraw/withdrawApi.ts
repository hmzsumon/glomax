import { apiSlice } from '../api/apiSlice';

export const withdrawApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create new withdraw request
		createWithdrawRequest: builder.mutation<any, any>({
			query: (body) => ({
				url: `/new/withdraw`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useCreateWithdrawRequestMutation } = withdrawApi;
