import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import { PiNavigationArrowFill } from 'react-icons/pi';
import { Select, Option, Input } from '@material-tailwind/react';
import {
	useCreateTradeMutation,
	useUpdateTradeMutation,
} from '@/features/trade/tradeApi';
import { useSelector } from 'react-redux';

const UpDown = () => {
	const { symbol } = useSelector((state: any) => state.trade);
	const l_symbol = symbol.toLowerCase();
	const [ticker, setTicker] = React.useState<any>(null);
	const [createTrade, { isError, isLoading, isSuccess, error }] =
		useCreateTradeMutation();

	const [
		updateTrade,
		{
			isError: upIsError,
			isLoading: upIsLoading,
			isSuccess: upIsSuccess,
			error: upError,
		},
	] = useUpdateTradeMutation();

	const remainingTimeOptions: any = {
		1: 30,
		3: 180,
		5: 300,
	};

	const [time, setTime] = React.useState(1);
	const [amount, setAmount] = React.useState(0.1);
	const [remainingTime, setRemainingTime] = useState(30);
	const [isTimerRunning, setIsTimerRunning] = useState(false);

	const formatTime = (timeInSeconds: any) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes < 10 ? '0' : ''}${minutes}:${
			seconds < 10 ? '0' : ''
		}${seconds}`;
	};

	// Countdown timer logic
	useEffect(() => {
		let timerInterval: any = null;

		if (isTimerRunning && remainingTime > 0) {
			timerInterval = setInterval(() => {
				setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
			}, 1000);
		} else {
			// Timer finished, call updateTrade function here
			if (ticker) {
				// Call the updateTrade function with necessary data
				const updateData = {
					close_price: ticker?.c,
				};

				if (remainingTime === 0 && isTimerRunning) {
					updateTrade(updateData);
					// console.log('update trade');
				}
			}

			// Reset timer and setIsTimerRunning
			setIsTimerRunning(false);
			setRemainingTime(remainingTimeOptions[time]);
		}

		// Clean up interval when component unmounts or remainingTime reaches 0
		return () => {
			clearInterval(timerInterval);
		};
	}, [isTimerRunning, remainingTime]);

	// handle create trade
	const handleCreateTrade = async (e: any) => {
		if (!ticker) {
			toast.warning('Network error, Please  try again!');
			return;
		} else if (ticker?.c === 0) {
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
		if (time < 5) {
			setTime(time + 2);
			setRemainingTime(remainingTimeOptions[time + 2]);
		}
	};
	// handle set time decrement
	const handleSetTimeDec = (e: any) => {
		if (time > 1) {
			setTime(time - 2);
			setRemainingTime(remainingTimeOptions[time - 2]);
		}
	};

	// handle set amount decrement
	const handleSetAmount = (e: any) => {
		setAmount(e.target.value);
	};

	useEffect(() => {
		const ws = new WebSocket(
			`wss://stream.binance.com:9443/ws/${l_symbol}@ticker`
		);

		ws.onopen = () => {
			console.log('WebSocket connection opened');
		};

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			// console.log(data);
			setTicker(data);
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed');
		};

		return () => {
			ws.close();
		};
	}, [symbol]);

	useEffect(() => {
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}

		if (isSuccess) {
			toast.success('Trade created successfully');
			setAmount(0.1);
		}
	}, [isError, isSuccess]);

	useEffect(() => {
		if (upIsError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}

		if (upIsSuccess) {
			toast.success('Trade Finished successfully');
		}
	}, [upIsError, upIsSuccess]);

	return (
		<div className=' space-y-1 '>
			<div className=' grid gap-4 grid-cols-2 '>
				<div>
					<li className=' rounded-md py-1 bg-black_3 flex items-center justify-around list-none'>
						<button
							className=' text-2xl md:text-3xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleSetTimeDec}
							disabled={isTimerRunning || time === 1 ? true : false}
						>
							-
						</button>
						<span>{time}min</span>
						<button
							className=' text-xl md:text-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleSetTimeInc}
							disabled={isTimerRunning || time === 5 ? true : false}
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
					disabled={isTimerRunning || !ticker ? true : false}
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
					disabled={isTimerRunning || !ticker ? true : false}
				>
					UP
					<PiNavigationArrowFill className='md:text-xl  rotate-90 ' />
				</button>
			</div>
		</div>
	);
};

export default UpDown;
