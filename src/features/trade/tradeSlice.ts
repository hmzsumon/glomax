import { createSlice } from '@reduxjs/toolkit';

interface TradeState {
	symbol: string;
}

const initialState: TradeState = {
	symbol: 'BTCUSDT',
};

export const tradeSlice = createSlice({
	name: 'trade',
	initialState,
	reducers: {
		setSymbol: (state, action) => {
			state.symbol = action.payload;
		},
	},
});

export const { setSymbol } = tradeSlice.actions;
export default tradeSlice.reducer;
