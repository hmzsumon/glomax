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
			invalidatesTags: ['User', 'Withdraws'],
		}),

		// get  my withdraw requests
		getMyWithdrawRequests: builder.query<any, any>({
			query: () => `/my-withdraws`,
			providesTags: ['Withdraws'],
		}),

		// get whatsapp code
		getWhatsappCode: builder.mutation<any, any>({
			query: (data) => ({
				url: `/whatsapp-verification-code`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useCreateWithdrawRequestMutation,
	useGetMyWithdrawRequestsQuery,
	useGetWhatsappCodeMutation,
} = withdrawApi;
