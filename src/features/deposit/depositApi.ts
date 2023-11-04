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
			invalidatesTags: ['Deposits', 'User'],
		}),

		// get my deposits
		getMyDeposits: builder.query<any, any>({
			query: () => '/deposits/me',
			providesTags: ['Deposits'],
		}),

		// get single deposit
		getDeposit: builder.query<any, any>({
			query: (id) => `/deposit/${id}`,
			providesTags: ['Deposits'],
		}),
	}),
});

export const {
	useCreateDepositRequestMutation,
	useGetMyDepositsQuery,
	useGetDepositQuery,
} = depositApi;
