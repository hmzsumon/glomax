import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import { PiNavigationArrowFill } from 'react-icons/pi';
import {
	Select,
	Option,
	Input,
	Dialog,
	DialogBody,
} from '@material-tailwind/react';
import {
	useCreateTradeMutation,
	useUpdateTradeMutation,
} from '@/features/trade/tradeApi';
import { useSelector } from 'react-redux';
import { useTickerContext } from '@/TickerContext';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ioBaseUrl from '@/config/ioBaseUrl';

const UpDown = () => {
	const { ticker } = useTickerContext();
	const { user } = useSelector((state: any) => state.auth);
	const { symbol } = useSelector((state: any) => state.trade);
	const [createTrade, { isError, isLoading, isSuccess, error }] =
		useCreateTradeMutation();

	const [time, setTime] = React.useState(30000);
	const [amount, setAmount] = React.useState(0.1);
	const [remainingTime, setRemainingTime] = useState(30);
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [trade, setTrade] = useState<any>(null);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	const formatTime = (timeInSeconds: any) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes < 10 ? '0' : ''}${minutes}:${
			seconds < 10 ? '0' : ''
		}${seconds}`;
	};

	function formatTime2(milliseconds: number) {
		if (milliseconds < 1000) {
			return `${milliseconds}ms`;
		} else if (milliseconds < 60000) {
			const seconds = Math.floor(milliseconds / 1000);
			return `${seconds}s`;
		} else {
			const minutes = Math.floor(milliseconds / 60000);
			return `${minutes}m`;
		}
	}

	// handle create trade
	const handleCreateTrade = async (e: any) => {
		if (user?.m_balance < amount) {
			toast.warning('Insufficient balance');
			return;
		}

		if (!ticker) {
			toast.warning('Network error, Please  try again!');
			return;
		} else if (amount < 0.1) {
			toast.warning('Network error, Please  try again!');
			return;
		} else if (!e.target.name) {
			toast.warning('Network error, Please  try again!');
			return;
		}

		e.preventDefault();
		const data = {
			amount,
			trade_type: e.target.name,
			open_price: ticker?.c,
			symbol,
			time,
		};
		console.log(data);
		createTrade(data);

		// Start the timer
		setIsTimerRunning(true);
	};

	// handle set time increment
	const handleSetTimeInc = (e: any) => {
		if (time < 300000) {
			setTime(time + 60000);
		}
	};
	// handle set time decrement
	const handleSetTimeDec = (e: any) => {
		if (time > 30000) {
			setTime(time - 60000);
		}
	};

	// handle set amount decrement
	const handleSetAmount = (e: any) => {
		setAmount(e.target.value);
	};

	useEffect(() => {
		const socket = socketIOClient(ioBaseUrl);

		socket.on('trade-pop', (data) => {
			console.log(data);
			// find this user particular data and set it to trade
			if (data.user_id === user?._id) {
				setTrade(data);
				setOpen(true);
				// Close the dialog after 3 seconds
				setTimeout(() => {
					setOpen(false);
					setTrade(null);
				}, 5000);
			}
		});

		// Cleanup function to disconnect the socket and remove event listener when the component unmounts
		return () => {
			socket.disconnect();
			socket.off('result-pop'); // Remove the 'result-pop' event listener
		};
	}, [user?._id]);

	useEffect(() => {
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}

		if (isSuccess) {
			toast.success('Trade created successfully');
			setIsTimerRunning(true);
			setTimeout(() => {
				setIsTimerRunning(false);
			}, 10000);
		}
	}, [isError, isSuccess]);

	return (
		<div className=' space-y-1 '>
			<div className=' grid gap-4 grid-cols-2 '>
				<div>
					<li className=' rounded-md py-1 bg-black_3 flex items-center justify-around list-none'>
						<button
							className=' text-2xl md:text-3xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleSetTimeDec}
							disabled={isTimerRunning || time === 30000 ? true : false}
						>
							-
						</button>
						<span>{formatTime2(time)}</span>
						<button
							className=' text-xl md:text-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleSetTimeInc}
							disabled={
								isTimerRunning || ticker?.s !== symbol || time === 300000
									? true
									: false
							}
						>
							+
						</button>
					</li>
				</div>
				<div className=''>
					<li className='  list-none'>
						<input
							type='number'
							name=''
							placeholder='Amount (USDT))'
							value={amount}
							className='py-[0.7rem] pl-4 focus:outline-none border focus:border-transparent border-black_3 rounded-md w-full  bg-black_3 focus:border-0  active:border-0  text-xs font-bold'
							onChange={handleSetAmount}
						/>
					</li>
				</div>
			</div>
			<div className=' grid gap-4 grid-cols-12 '>
				<button
					name='down'
					className='rounded-md py-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-x-4 col-span-5 bg-red-500'
					onClick={handleCreateTrade}
					disabled={
						isTimerRunning || ticker?.s !== symbol || !ticker ? true : false
					}
				>
					Down
					<PiNavigationArrowFill className='md:text-xl  rotate-180 ' />
				</button>
				<div className='col-span-2 flex items-center justify-center'>
					<div className=' bg-black_3 p-2 h-8 flex items-center justify-center rounded-md w-12'>
						<p className=' text-xs font-bold'>{formatTime(remainingTime)}</p>
					</div>
				</div>
				<button
					className='rounded-md flex items-center disabled:opacity-50 justify-center gap-x-5 py-1 col-span-5 bg-green-500 disabled:cursor-not-allowed'
					name='up'
					onClick={handleCreateTrade}
					disabled={
						isTimerRunning || ticker?.s !== symbol || !ticker ? true : false
					}
				>
					UP
					<PiNavigationArrowFill className='md:text-xl  rotate-90 ' />
				</button>
			</div>
			<>
				<Dialog
					open={open}
					handler={handleOpen}
					size='xs'
					className='text-white bg-black_2 px-0 overflow-auto'
				>
					<div className='flex items-center justify-center py-3 '>
						<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
							My Trade Records
						</h4>
						<IoCloseCircleOutline
							className='absolute text-2xl text-blue-gray-600 cursor-pointer right-3 top-2 hover:text-red-500'
							onClick={handleOpen}
						/>
					</div>
					<hr className='my-2 border border-black_3' />
					{trade && (
						<DialogBody className=' px-0 overflow-auto'>
							<div className='px-4 py-1 list-none text-blue-gray-400 '>
								<div className='grid grid-cols-2'>
									<li>Symbol</li>
									<li className='text-end'>{trade?.symbol}</li>
								</div>
								<div className='grid grid-cols-2'>
									<li>Open Price</li>
									<li className='text-end'>{trade?.open_price}</li>
								</div>
								<div className='grid grid-cols-2'>
									<li>Close Price</li>
									<li className='text-end'>{trade?.close_price}</li>
								</div>

								<div className='grid grid-cols-2'>
									<li>Trade Amount</li>
									<li className='text-end'>{trade?.trade_amount}</li>
								</div>

								{trade?.result === 'win' && (
									<div className='grid grid-cols-2'>
										<li>Win Amount</li>
										<li className='text-end text-[#388E3C]'>
											+{Number(trade?.profit).toFixed(2)}
										</li>
									</div>
								)}

								{trade?.result === 'loss' && (
									<div className='grid grid-cols-2'>
										<li>Lose Amount</li>
										<li className='text-end text-[#D32F2F]'>
											-{Number(trade?.trade_amount).toFixed(2)}
										</li>
									</div>
								)}

								<div className='grid grid-cols-2 '>
									<li>Select</li>
									<li className='text-end'>{trade?.trade_type}</li>
								</div>
							</div>
						</DialogBody>
					)}
				</Dialog>
			</>
		</div>
	);
};

export default UpDown;
