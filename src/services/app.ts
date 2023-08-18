import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { BitcoinData } from '@/features/bitcoinTypes';

const BASE_URL = 'https://blockchain.info';

export const bitcoinApi = createApi({
	reducerPath: 'bitcoinApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		getBitcoinData: builder.query<BitcoinData, void>({
			query: () => `/ticker`,
		}),
	}),
});

export const { useGetBitcoinDataQuery } = bitcoinApi;
