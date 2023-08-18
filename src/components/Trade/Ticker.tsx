import React, { useEffect, useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useSelector, useDispatch } from 'react-redux';
import { setSymbol } from '@/features/trade/tradeSlice';
const Ticker = ({ coin, closeDrawer }: any) => {
	const dispatch = useDispatch();
	// handle select ticker
	const handleSelectTicker = (e: any) => {
		dispatch(setSymbol(e.symbol));
		closeDrawer();
	};

	return (
		<div>
			<button
				className='flex items-center justify-between w-full p-4 rounded-lg shadow-md'
				onClick={() => handleSelectTicker(coin)}
			>
				<h2 className='font-semibold '>{coin?.symbol}</h2>
				<div className='items-center'>
					<p
						className={`text-sm text-right ${
							coin?.lastPrice > coin?.bidPrice
								? 'text-green-500'
								: coin?.lastPrice < coin?.bidPrice
								? 'text-deep-orange-500'
								: 'text-blue-gray-200'
						}`}
					>
						{coin?.lastPrice <= 0
							? Number(coin?.lastPrice).toFixed(8)
							: Number(coin?.lastPrice).toFixed(2)}
					</p>
					<p
						className={`text-sm text-right  ${
							coin?.priceChangePercent > 0
								? 'text-green-500'
								: 'text-deep-orange-500'
						}`}
					>
						{Number(coin?.priceChangePercent).toFixed(2)}%
					</p>
				</div>
			</button>
		</div>
	);
};

export default Ticker;
