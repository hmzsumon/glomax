import { apiSlice } from '../api/apiSlice';

export const tradeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTrades: builder.query({
			query: () => '/trades',
			providesTags: ['Trade'],
		}),

		// create trade
		createTrade: builder.mutation({
			query: (body) => ({
				url: '/trade',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Trade', 'User'],
		}),

		// update trade
		updateTrade: builder.mutation({
			query: (body) => ({
				url: '/update/trade',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Trade', 'User'],
		}),

		// my trades
		myTrades: builder.query({
			query: () => '/my/trades',
			providesTags: ['Trade'],
		}),
	}),
});

export const {
	useGetTradesQuery,
	useCreateTradeMutation,
	useUpdateTradeMutation,
	useMyTradesQuery,
} = tradeApi;
