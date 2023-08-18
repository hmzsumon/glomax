import { createSlice } from '@reduxjs/toolkit';

const cryptoSlice = createSlice({
	name: 'crypto',
	initialState: {},
	reducers: {
		updateTickerData: (state, action) => {
			console.log('action.payload.coin', action.payload.coin);
			// Update your state based on the incoming ticker data
			return { ...state, [action.payload.coin]: action.payload.data };
		},
	},
});

export const { updateTickerData } = cryptoSlice.actions;

export default cryptoSlice.reducer;
