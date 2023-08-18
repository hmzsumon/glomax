import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTickerData } from '@/cryptoSlice';
import WebSocketService from '@/WebSocketService';

const Ticker2 = ({ coin }: any) => {
	const dispatch = useDispatch();
	const tickerData = useSelector((state: any) => state.crypto[coin]);
	console.log(coin);
	return (
		<div>
			{coin ? (
				<div>
					<h2>{coin?.symbol} Ticker</h2>
					<p>Price: {coin?.lastPrice}</p>
					{/* Other data */}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Ticker2;
