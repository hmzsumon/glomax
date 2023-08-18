import { getCookie } from '@/utils/cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000/api/v1'
		: 'https://rapid-win-api-54de44966350.herokuapp.com/api/v1';

// console.log('baseUrl', baseUrl);
export const apiSlice = createApi({
	reducerPath: 'api',

	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		// Introduce an artificial delay using `setTimeout`
		prepareHeaders: (headers, { getState }) => {
			const token = getCookie('token');
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: [
		'Users',
		'Admin',
		'Pxc',
		'Wallet',
		'Transactions',
		'User',
		'Withdraw',
		'Withdraws',
		'MyWithdraws',
		'Mining',
		'Test',
		'Game-1m',
		'Game-3m',
		'Game-5m',
	],
	endpoints: (builder) => ({}),
});

//https://wfc-api.herokuapp.com/api/v1
//http://localhost:5005/api/v1
