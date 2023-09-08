import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Currencies } from './bitcoinTypes';

type AppState = {
	currency: Currencies;
	faqData: any[];
	faqTitle: string;
};

const initialState: AppState = {
	currency: Currencies.USD,
	faqData: [],
	faqTitle: '',
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		changeCurrency: (state, action: PayloadAction<Currencies>) => {
			state.currency = action.payload;
		},

		setFaqData: (state, action: PayloadAction<any[]>) => {
			state.faqData = action.payload;
		},

		setFaqTitle: (state, action: PayloadAction<string>) => {
			state.faqTitle = action.payload;
		},
	},
});

export const { changeCurrency, setFaqData, setFaqTitle } = appSlice.actions;
export default appSlice.reducer;
