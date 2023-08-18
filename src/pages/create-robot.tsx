import Layout from '@/Layout';
import RobotHeader from '@/components/AiRobot/RobotHeader';
import Market from '@/components/Trade/Market';
import ProtectedRoute from '@/global/ProtectedRoute';
import { HistoryIcon } from '@/global/icons/CommonIcons';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BiTransferAlt } from 'react-icons/bi';
import { HiArrowSmLeft } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import socketIOClient from 'socket.io-client';
const CreateRobot = () => {
	const { symbol } = useSelector((state: any) => state.trade);
	const l_symbol = symbol.toLowerCase();
	const [ticker, setTicker] = React.useState<any>(null);
	const [tickers, setTickers] = React.useState<any[]>([]);
	const [open, setOpen] = React.useState<boolean>(false);

	useEffect(() => {
		const socket = socketIOClient(
			'https://rapid-trade-api-8113f7eb458c.herokuapp.com'
		);
		socket.on('tickers', (data: any[]) => {
			setTickers(data);
			// find ticker by symbol
			const f_ticker = data.find((t) => t.symbol === symbol);
			setTicker(f_ticker);
		});

		return () => {
			socket.disconnect();
		};
	}, [symbol]);
	// console.log(ticker);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-2 py-36 ai-wrapper'>
					{/* <div className='ai-overlay'></div> */}
					<div className='relative px-4 py-6 mx-auto space-y-4 rounded-lg bg-black_2 md:w-7/12'>
						<div>
							<RobotHeader ticker={ticker} setOpen={setOpen} open={open} />
						</div>
						{/* Start Price Range */}
						<div>
							<h2 className='my-2'>1. Price Range</h2>
							<div className='grid grid-cols-2 gap-x-4 '>
								<div className='space-y-2 '>
									<p className=' text-blue-gray-300'>Upper Price</p>
									<div className='flex items-center p-2 pl-4 space-x-2 rounded-md bg-black_3 '>
										{ticker?.highPrice ? (
											<p className=' text-blue-gray-100'>
												{Number(ticker?.highPrice).toLocaleString('en-US', {
													minimumFractionDigits: 3,
												})}
											</p>
										) : (
											<div className='flex items-center justify-center mt-3 '>
												<BeatLoader size={5} color={'#fff'} />
											</div>
										)}
									</div>
								</div>
								<div className='space-y-2 '>
									<p className=' text-blue-gray-300'>Lower Price</p>
									<div className='flex items-center p-2 pl-4 space-x-2 rounded-md bg-black_3 '>
										{ticker?.lowPrice ? (
											<p className=' text-blue-gray-100'>
												{Number(ticker?.lowPrice).toLocaleString('en-US', {
													minimumFractionDigits: 3,
												})}
											</p>
										) : (
											<div className='flex items-center justify-center mt-3 '>
												<BeatLoader size={5} color={'#fff'} />
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						{/* End Price Range */}

						<div>
							<h2 className='my-2'>2. Grids</h2>
							<div className='relative '>
								<input
									type='text'
									placeholder='1-170'
									className='w-full p-2 rounded-md outline-none bg-black_3 placeholder-blue-gray-400'
								/>
								<span className='absolute right-6 top-2 text-blue-gray-200'>
									Arithmetic
								</span>
							</div>
							<div className='flex items-center justify-between '>
								<p className='my-2 text-xs text-blue-gray-300'>
									Profit/Grid (fees deducted)
								</p>
								<p className='my-2 text-xs text-blue-gray-300'>
									1% - 30% (1% default)
								</p>
							</div>
						</div>

						<div>
							<h2 className='my-2'>3. Investment</h2>
							<div className='relative '>
								<input
									type='text'
									placeholder='=> 30'
									className='w-full p-2 rounded-md outline-none bg-black_3 placeholder-blue-gray-400'
								/>
								<span className='absolute right-6 top-2 text-blue-gray-200'>
									USDT
								</span>
							</div>
						</div>

						<div className='my-4 '>
							<button className='w-full py-2 font-bold text-gray-800 bg-yellow-700 rounded-md '>
								Create
							</button>
						</div>
					</div>
					<Market open={open} setOpen={setOpen} tickers={tickers} />
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default CreateRobot;
