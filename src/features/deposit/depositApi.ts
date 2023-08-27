import { apiSlice } from '../api/apiSlice';

export const depositApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create deposit request
		createDepositRequest: builder.mutation<any, any>({
			query: (body) => ({
				url: '/new/deposit',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Deposits'],
		}),

		// get my deposits
		getMyDeposits: builder.query<any, any>({
			query: () => '/deposits/me',
			providesTags: ['Deposits'],
		}),
	}),
});

export const { useCreateDepositRequestMutation, useGetMyDepositsQuery } =
	depositApi;
