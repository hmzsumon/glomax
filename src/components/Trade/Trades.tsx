import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';

const headers = [
	{
		id: 1,
		label: 'Time',
		class: 'text-left',
	},
	{
		id: 2,
		label: 'Price',
		class: 'text-center',
	},
	{
		id: 3,
		label: 'Amount',
		class: 'text-right',
	},
];

const Trades = () => {
	const [tradeDataQueue, setTradeDataQueue] = useState<any[]>([]);
	const [prevPrice, setPrevPrice] = useState<number | null>(null);
	const [prevPriceColor, setPrevPriceColor] = useState<string>('text-white');
	const { symbol } = useSelector((state: any) => state.trade);
	const l_symbol = symbol.toLowerCase();
	useEffect(() => {
		const ws = new WebSocket(
			`wss://stream.binance.com:9443/ws/${l_symbol}@trade`
		);

		ws.onopen = () => {
			console.log('WebSocket connection opened');
		};

		ws.onmessage = (event) => {
			const tradeData = JSON.parse(event.data);
			// console.log(tradeData);
			if (tradeData.e === 'trade') {
				setTradeDataQueue((prevTradeDataQueue) => {
					if (prevTradeDataQueue.length >= 10) {
						// Remove the oldest trade data to maintain a queue of 10 items
						prevTradeDataQueue.pop();
					}
					let colorClass = 'text-white';

					if (prevPrice !== null) {
						if (tradeData.p > prevPrice) {
							colorClass = 'text-green-500';
						} else if (tradeData.p < prevPrice) {
							colorClass = 'text-red-500';
						}
					}

					tradeData.colorClass = colorClass;
					setPrevPrice(tradeData.p);
					setPrevPriceColor(colorClass);
					return [tradeData, ...prevTradeDataQueue];
				});
			}
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed');
		};

		return () => {
			ws.close();
		};
	}, [symbol]);

	return (
		<div className='py-1 bg-black_2 text-blue-gray-200 w-full h-80 '>
			<h2 className='my-1 text-center '>Recent Trade </h2>
			<hr className='border border-black_3' />
			{tradeDataQueue.length > 9 ? (
				<div className='px-6 '>
					<ul className='grid grid-cols-3 my-2 list-none'>
						{headers.map((header) => (
							<li
								key={header.id}
								className={`
                      ${header.class}
            `}
							>
								{header.label}
							</li>
						))}
					</ul>
					{tradeDataQueue.map((tradeData, index) => (
						<ul key={index} className='grid grid-cols-3 '>
							<li className=''>{new Date(tradeData.T).toLocaleTimeString()}</li>
							<li className={`text-center ${tradeData.colorClass}`}>
								{Number(tradeData.p).toLocaleString('en-US', {
									minimumFractionDigits: 2,
								})}
							</li>
							<li className='text-right '>
								{Number(tradeData.q).toLocaleString('en-US', {
									minimumFractionDigits: 5,
								})}
							</li>
						</ul>
					))}
				</div>
			) : (
				<div className=' flex items-center justify-center h-full'>
					<ScaleLoader color='#26a69a' loading={true} />
				</div>
			)}
		</div>
	);
};

export default Trades;
