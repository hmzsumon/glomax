import UserLayout from '@/components/layout/UserLayout';
import React, { useState } from 'react';

// import Hooks
import { useAppDispatch, useAppSelector } from '@reduxHooks';
// actions
import { changeCurrency } from '@/features/appSlice';
import { useGetBitcoinDataQuery } from '@/services/app';

const localData = ['USD', 'EUR', 'JPY', 'GBP', 'AUD'];
const TestReduxToolkit = () => {
	const { data, isLoading } = useGetBitcoinDataQuery();
	// console.log(data, isLoading);
	const { currency } = useAppSelector((state) => state.app);
	const dispatch = useAppDispatch();

	const handleCurrencySelection = (e: any) =>
		dispatch(changeCurrency(e.currentTarget.value));

	return (
		<UserLayout>
			<div className='flex flex-col items-center justify-center h-[50vh]'>
				<h1 className='text-center '>Test Redux Toolkit</h1>
				{/* Select currency */}
				<select
					className='w-[100px] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500'
					onChange={handleCurrencySelection}
				>
					{data &&
						Object.keys(data).map((currency) => (
							<option key={currency} value={currency}>
								{currency}
							</option>
						))}
				</select>
				<button className='px-4 w-[200px] py-2 mt-2 text-white bg-yellow-700 rounded-md'>
					{data && data[currency].symbol} {data && data[currency].last}
				</button>
			</div>
		</UserLayout>
	);
};

export default TestReduxToolkit;

// useEffect(() => {
// 	const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

// 	ws.onopen = () => {
// 		console.log('WebSocket connected');
// 	};

// 	ws.onmessage = (event) => {
// 		const data = JSON.parse(event.data);
// 		console.log('WebSocket message:', data);
// 		// Handle the data received from the WebSocket
// 		setSymbols(data);
// 	};

// 	ws.onclose = () => {
// 		console.log('WebSocket closed');
// 	};

// 	return () => {
// 		ws.close(); // Close the WebSocket connection when component unmounts
// 	};
// }, []);
