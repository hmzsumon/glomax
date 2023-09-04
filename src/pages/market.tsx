import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const headers = [
	{
		id: 1,
		name: 'Name/Vol',
		class: 'text-left',
	},
	{
		id: 2,
		name: 'Last Price',
		class: 'text-center',
	},
	{
		id: 3,
		name: '24h Chg%',
		class: 'text-right',
	},
];

const Market = () => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [searchResults, setSearchResults] = React.useState<any[]>([]);
	const formatValue = (value: any) => {
		// convert to number
		value = Number(value);
		if (typeof value !== 'number') {
			return ''; // Return an empty string or any appropriate placeholder
		}

		if (value >= 1000000000) {
			return `${(value / 1000000000).toFixed(2)}B`;
		} else if (value >= 1000000) {
			return `${(value / 1000000).toFixed(2)}M`;
		} else {
			return value.toFixed(2);
		}
	};

	// console.log(searchResults);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query.trim() === '') {
			setSearchResults([]);
		} else {
			const filteredTickers = tickers.filter((ticker) =>
				ticker.symbol.toLowerCase().includes(query.toLowerCase())
			);
			setSearchResults(filteredTickers);
		}
	};

	const [tickers, setTickers] = React.useState<any[]>([]);
	const [ticker, setTicker] = React.useState<any>(null);
	useEffect(() => {
		const socket = socketIOClient(
			'https://glomax-trade-api-372edeb4df58.herokuapp.com'
		);
		socket.on('tickers', (data: any[]) => {
			// console.log(data);
			setTickers(data);
			// find ticker by symbol
			// const f_ticker = data.find((t) => t.symbol === symbol);
			// setTicker(f_ticker);
		});

		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='pt-14 md:pt-[5.5rem] pb-[4.5rem] md:pb-[5rem]'>
					<div className='py-4 mx-auto rounded md:w-6/12 bg-black_2'>
						<div>
							<h2 className='text-xl text-center text-blue-gray-300'>
								Market Overview{' '}
							</h2>
						</div>
						<div className='px-2 my-2'>
							{/* Search Box */}
							<input
								type='text'
								placeholder='e.g BTCUSDT'
								value={searchQuery}
								onChange={(e) => handleSearch(e.target.value)}
								className='w-full px-2 py-2 mt-2 rounded-md bg-black_3 text-blue-gray-300 focus:outline-none focus:ring focus:border-blue-500 placeholder:text-blue-gray-800'
							/>
						</div>
						<div>
							<ul className='grid grid-cols-3 px-2 py-1 '>
								{headers.map((header) => (
									<li
										key={header.id}
										className={`${header.class} text-blue-gray-700 font-bold`}
									>
										{header.name}
									</li>
								))}
							</ul>

							{searchResults.length > 0 ? (
								<div className=''>
									{searchResults.map((ticker, index) => (
										<ul key={index} className='grid grid-cols-3 px-2 py-1'>
											<li className='font-bold text-left text-gray-500'>
												<h2 className=''>{ticker?.symbol}</h2>
												<p className='text-xs '>
													Vol {formatValue(ticker?.quoteVolume)}
												</p>
											</li>
											<li className='w-7/12 mx-auto font-bold text-left text-gray-500 '>
												<h2
													className={` flex flex-col ${
														Number(ticker?.lastPrice) > Number(ticker?.bidPrice)
															? 'text-green-500'
															: Number(ticker?.lastPrice) <
															  Number(ticker?.bidPrice)
															? 'text-deep-orange-500'
															: 'text-blue-gray-100'
													}`}
												>
													<span className='text-xl '>
														{ticker?.lastPrice?.length === 10
															? Number(ticker?.lastPrice).toLocaleString(
																	'en-US',
																	{
																		minimumFractionDigits: 6,
																	}
															  )
															: Number(ticker?.lastPrice).toLocaleString(
																	'en-US',
																	{
																		minimumFractionDigits: 2,
																	}
															  )}
													</span>
													<span className='text-xs text-blue-gray-300'>
														$
														{ticker?.lastPrice?.length === 10
															? Number(ticker?.lastPrice).toLocaleString(
																	'en-US',
																	{
																		minimumFractionDigits: 6,
																	}
															  )
															: Number(ticker?.lastPrice).toLocaleString(
																	'en-US',
																	{
																		minimumFractionDigits: 2,
																	}
															  )}
													</span>
												</h2>
											</li>
											<li className='font-bold text-right text-gray-500'>
												<button
													className={` w-[50%] rounded-sm text-blue-gray-100 px-2 p-2 text-xs ${
														Number(ticker?.priceChangePercent) > 0
															? 'bg-green-500'
															: 'bg-[#F6455B]'
													}`}
												>
													{ticker?.priceChangePercent}
												</button>
											</li>
										</ul>
									))}
								</div>
							) : (
								<div className=''>
									{tickers.map((ticker, index) => (
										<ul key={index} className='grid grid-cols-3 px-2 py-1'>
											<li className='font-bold text-left text-gray-500'>
												<h2 className=''>{ticker?.symbol}</h2>
												<p className='text-xs '>
													Vol {formatValue(ticker?.quoteVolume)}
												</p>
											</li>
											<li className='w-7/12 mx-auto font-bold text-left text-gray-500 '>
												<h2
													className={` flex flex-col ${
														Number(ticker?.lastPrice) > Number(ticker?.bidPrice)
															? 'text-green-500'
															: Number(ticker?.lastPrice) <
															  Number(ticker?.bidPrice)
															? 'text-deep-orange-500'
															: 'text-blue-gray-100'
													}`}
												>
													<span className='text-xl '>
														{ticker?.lastPrice?.length === 10
															? Number(ticker?.lastPrice).toLocaleString(
																	'en-US',
																	{
																		minimumFractionDigits: 6,
																	}
															  )
															: Number(ticker?.lastPrice).toLocaleString(
																	'en-US',
																	{
																		minimumFractionDigits: 2,
																	}
															  )}
													</span>
													<span className='text-xs text-blue-gray-300'>
														$
														{ticker?.lastPrice?.length === 10
															? Number(ticker?.lastPrice).toLocaleString(
																	'en-US',
																	{
																		minimumFractionDigits: 6,
																	}
															  )
															: Number(ticker?.lastPrice).toLocaleString(
																	'en-US',
																	{
																		minimumFractionDigits: 2,
																	}
															  )}
													</span>
												</h2>
											</li>
											<li className='font-bold text-right text-gray-500'>
												<button
													className={` w-[50%] rounded-sm text-blue-gray-100 px-2 p-2 text-xs ${
														Number(ticker?.priceChangePercent) > 0
															? 'bg-green-500'
															: 'bg-[#F6455B]'
													}`}
												>
													{ticker?.priceChangePercent}
												</button>
											</li>
										</ul>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Market;
