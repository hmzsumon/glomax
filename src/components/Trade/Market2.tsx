import React, { useState, useEffect } from 'react';
import {
	Drawer,
	Button,
	Typography,
	IconButton,
} from '@material-tailwind/react';

import { useGetBitDataQuery } from '@/services/tradeServices';

const Market = ({ open, setOpen, symbol }: any) => {
	const { data, isLoading } = useGetBitDataQuery(undefined, {
		skip: !open,
	});
	// console.log(data, isLoading);
	const openDrawer = () => setOpen(true);
	const closeDrawer = () => setOpen(false);

	const [tradingPairs, setTradingPairs] = useState<string[]>([]);
	// console.log(tradingPairs);

	// useEffect(() => {
	// 	async function fetchTradingPairs() {
	// 		try {
	// 			const response = await axios.get(
	// 				'https://api.binance.com/api/v3/exchangeInfo'
	// 			);

	// 			const symbols = response.data.symbols;
	// 			const usdtPairs = symbols
	// 				.filter((symbol: any) => symbol.quoteAsset === 'USDT')
	// 				.map((symbol: any) => symbol.symbol);

	// 			const priceResponse = await axios.get(
	// 				'https://api.binance.com/api/v3/ticker/24hr'
	// 			);
	// 			const priceData = priceResponse.data;
	// 			const pairsWithPriceChange = usdtPairs.map((pair: any) => {
	// 				const priceInfo = priceData.find((data: any) => data.symbol === pair);
	// 				const lastPrice = parseFloat(priceInfo.lastPrice);
	// 				const priceChangePercent = parseFloat(priceInfo.priceChangePercent);
	// 				console.log(typeof lastPrice);
	// 				return {
	// 					pair,
	// 					lastPrice,
	// 					priceChangePercent,
	// 				};
	// 			});
	// 			// console.log(pairsWithPriceChange);
	// 			setTradingPairs(pairsWithPriceChange);
	// 		} catch (error) {
	// 			console.error('Error fetching trading pairs:', error);
	// 		}
	// 	}

	// 	fetchTradingPairs();
	// }, []);
	return (
		<React.Fragment>
			<Drawer
				open={open}
				onClose={closeDrawer}
				className='p-4 overflow-y-auto bg-black_2'
			>
				<div className='flex items-center justify-between mb-6'>
					<Typography variant='h5' className=' text-blue-gray-200'>
						Market Overview
					</Typography>
					<IconButton variant='text' color='blue-gray' onClick={closeDrawer}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='w-5 h-5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</IconButton>
				</div>
				<div className=''>
					{tradingPairs.map((pairInfo: any) => (
						<div
							key={pairInfo?.pair}
							className='flex items-center justify-between p-4 rounded-lg shadow-md'
						>
							<h2 className='font-semibold '>{pairInfo?.pair}</h2>
							<div className='items-center'>
								<p
									className={`text-sm text-right ${
										pairInfo.priceChangePercent > 0
											? 'text-green-500'
											: pairInfo.priceChangePercent < 0
											? 'text-deep-orange-500'
											: 'text-blue-gray-200'
									}`}
								>
									{pairInfo?.lastPrice <= 0
										? pairInfo?.lastPrice.toFixed(8)
										: pairInfo?.lastPrice.toFixed(2)}
								</p>
								<p
									className={`text-sm text-right  ${
										pairInfo.priceChangePercent > 0
											? 'text-green-500'
											: 'text-deep-orange-500'
									}`}
								>
									{Number(pairInfo?.priceChangePercent).toFixed(2)}%
								</p>
							</div>
						</div>
					))}
				</div>
			</Drawer>
		</React.Fragment>
	);
};

export default Market;
