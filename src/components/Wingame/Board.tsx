import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import BoardHeader from './BoardHeader';
import { MyCombinedInterface, TradeInterface } from '@/types/myInterface';
import { type } from 'os';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
	Checkbox,
} from '@material-tailwind/react';
import { ExplanationIcon } from '@/global/icons/CommonIcons';
import { fetchBaseQueryError } from '@/services/helpers';
import { useSelector } from 'react-redux';
import { color } from 'framer-motion';
import Timer from './Timer';
import useTimer from '@/hooks/useTimer';
import { useWinGameCreateTradeMutation } from '@/features/winGame/winGameApi';
import { useLoadUserQuery } from '@/features/auth/authApi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { read } from 'fs';

const buttons = [
	{
		id: 1,
		value: '0',
		title: 'Selected 0',
		class: 'btn-0',
		color: 'bg-[#6739b6]',
		colors: ['#6739B6', '#D32F2F'],
		profit: 6,
	},
	{
		id: 2,
		value: '1',
		title: 'Selected 1',
		color: 'bg-green-700',
		colors: ['#388E3C'],
		profit: 6,
	},
	{
		id: 3,
		value: '2',
		title: 'Selected 2',
		color: 'bg-red-700',
		colors: ['#D32F2F'],
		profit: 6,
	},
	{
		id: 4,
		value: '3',
		title: 'Selected 3',
		color: 'bg-green-700',
		colors: ['#388E3C'],
		profit: 6,
	},
	{
		id: 5,
		value: '4',
		title: 'Selected 4',
		color: 'bg-red-700',
		colors: ['#D32F2F'],
		profit: 6,
	},
	{
		id: 6,
		value: '5',
		title: 'Selected 5',
		class: 'btn-5',
		color: 'bg-[#6739b6]',
		colors: ['#6739B6', '#388E3C'],
		profit: 6,
	},
	{
		id: 7,
		value: '6',
		title: 'Selected 6',
		color: 'bg-red-700',
		colors: ['#D32F2F'],
		profit: 6,
	},
	{
		id: 8,
		value: '7',
		title: 'Selected 7',
		color: 'bg-green-700',
		colors: ['#388E3C'],
		profit: 6,
	},
	{
		id: 9,
		value: '8',
		title: 'Selected 8',
		color: 'bg-red-700',
		colors: ['#D32F2F'],
		profit: 6,
	},
	{
		id: 10,
		value: '9',
		title: 'Selected 9',
		color: 'bg-green-700',
		colors: ['#388E3C'],
		profit: 6,
	},
];

const upperButtons = [
	{
		id: 1,
		bet_id: 11,
		value: 'green',
		color: 'bg-green-700',
		title: 'Join Green',
		colors: ['#388E3C'],
		profit: 2,
	},
	{
		id: 2,
		bet_id: 12,
		value: 'violet',
		color: 'bg-[#6739b6]',
		title: 'Join Violet',
		colors: ['#6739B6'],
		profit: 4.5,
	},
	{
		id: 3,
		bet_id: 13,
		value: 'red',
		color: 'bg-red-700',
		title: 'Join Red',
		colors: ['#D32F2F'],
		profit: 2,
	},
];

const Board: React.FC<MyCombinedInterface> = ({ game }) => {
	const {
		remainingSeconds: timer,
		id,
		gameId,
		setTimer,
	} = useTimer({
		gameType: game?.game_type,
	});
	const [winGameCreateTrade, { isLoading, isSuccess, isError, error }] =
		useWinGameCreateTradeMutation();

	const { user } = useSelector((state: any) => state.auth);
	const [btnActive, setBtnActive] = useState<boolean>(false);
	const [readOnly, setReadOnly] = useState<boolean>(false);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);
	const [textError, setTextError] = useState<string>('');
	const [amount, setAmount] = useState<number>(0.1);

	const [trade, setTrade] = useState<any>({});
	// console.log('trade', trade);
	//  handle multiplier
	const handleMultiplier = (m: number) => {
		setAmount(amount * m);
	};

	// handle change
	const handleChange = (e: number) => {
		setAmount(e);
		if (e > 0.1 || amount < user?.m_balance) {
			setTextError('');
		}
	};

	// handle trade
	const handleTrade = (e: any) => {
		if (user?.is_active === false) {
			toast.info('Please activate your account first');
			return;
		}
		handleOpen();
		setTrade(e);
		// console.log('trade', e);
	};

	// handle submit trade
	const handleSubmitTrade = async () => {
		if (amount < 0.1 || amount > user?.m_balance) {
			if (amount < 0.1) {
				setTextError('Minimum trade amount is $0.1');
			} else if (amount > user?.m_balance) {
				setTextError('Insufficient balance');
			}
		} else {
			setTextError('');
			const data = {
				user_id: user?._id,
				name: user?.name,
				username: user?.username,
				customer_id: user?.customer_id,
				colors: trade?.colors,
				amount,
				bet_id: trade?.bet_id,
				game_id: id,
				game_type: game?.game_type,
				multiplier: trade?.profit,
				value: trade?.value,
			};
			// console.log('data', data);
			winGameCreateTrade(data);
			setOpen(false);
			setTrade({});
			setAmount(null as any);
			// if (res.data.status === 'success') {
			// 	setOpen(false);
			// 	setTrade({});
			// 	setAmount('');
			// 	setTimer(0);
			// }
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
			toast.success('Trade created successfully');
		}
		if (isError) {
			setOpen(false);
			toast.error((error as fetchBaseQueryError).data.message);
		}
	}, [isSuccess, isError, error]);

	useEffect(() => {
		if (timer <= 10 && game?.game_type === '1m') {
			setOpen(false);
			setTrade({});
			setBtnActive(false);
		} else if (timer <= 15 && game?.game_type === '3m') {
			setOpen(false);
			setTrade({});
			setBtnActive(false);
		} else if (timer <= 30 && game?.game_type === '5m') {
			setOpen(false);
			setTrade({});
			setBtnActive(false);
		} else {
			setBtnActive(true);
		}
		// console.log('BTN', btnActive, game?.game_type, timer);
	}, [timer]);

	return (
		<div>
			<BoardHeader />
			<div className='px-4 py-6 space-y-6 rounded-b-lg bg-black_2'>
				<Timer gameType={game?.game_type} />
				<div className='grid grid-cols-3 gap-6 '>
					{upperButtons.map((button) => {
						return (
							<button
								key={button.id}
								className={` rounded-md py-2 md:text-xl md:py-4 font-semibold disabled:cursor-not-allowed  ${button.color}   `}
								disabled={!btnActive}
								onClick={() => handleTrade(button)}
							>
								{button.title}
							</button>
						);
					})}
				</div>
				<div className='grid grid-cols-5 gap-2 '>
					{buttons.map((button) => {
						return (
							<button
								key={button.id}
								className={` disabled:cursor-not-allowed rounded-md py-2 md:py-4 font-bold md:text-xl ${
									button.class ? button.class : button.color
								}   btn-lg`}
								disabled={!btnActive}
								onClick={() => handleTrade(button)}
							>
								{button.value}
							</button>
						);
					})}
				</div>
			</div>
			<>
				<Dialog
					size='xs'
					open={open}
					handler={handleOpen}
					className='text-white bg-black_2'
				>
					<div className='flex items-center justify-center py-3 '>
						<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
							{trade?.title}
						</h4>
						<IoCloseCircleOutline
							className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
							onClick={handleOpen}
						/>
					</div>
					<hr className='my-2 border border-black_3' />
					<DialogBody>
						<div>
							<div className='relative flex flex-col gap-1 '>
								<label className='mb-1 text-sm font-semibold text-gray-400 '>
									Trade Amount
								</label>
								<input
									className={`px-4 py-2 ${
										textError && 'border-red-500'
									} text-blue-gray-200 bg-transparent border rounded hover:border-yellow-500 focus:border-yellow-600  focus:outline-none placeholder:text-blue-gray-600 `}
									type='number'
									placeholder='> 0.1'
									value={amount}
									onChange={(e: any) =>
										handleChange(parseFloat(e.target.value))
									}
								/>

								{amount && (
									<div
										className=' absolute right-2 top-[40.2px] text-xs font-bold text-yellow-800 '
										// onClick={handleResend}
									>
										<span className='flex text-gray-500 '>
											<span
												className='flex items-start justify-center w-6 h-6 p-1 rounded-full cursor-pointer hover:text-white hover:bg-blue-gray-600'
												onClick={() => handleMultiplier(2)}
											>
												2x
											</span>
											<span
												className='flex items-start justify-center w-6 h-6 p-1 rounded-full cursor-pointer hover:text-white hover:bg-blue-gray-600'
												onClick={() => handleMultiplier(3)}
											>
												3x
											</span>
										</span>
									</div>
								)}

								{textError && (
									<p className='text-xs text-red-500'>{textError}</p>
								)}
								<div className='flex items-center justify-between '>
									<small className='text-gray-500 '>
										Your Balance:{' '}
										<span className='text-green-700'>
											${Number(user?.m_balance).toFixed(2)}
										</span>
									</small>
									<small>
										Minimum trade: <span className='text-green-700'>$0.1</span>
									</small>
								</div>
							</div>

							{/* <div className='-ml-2.5'>
								<Checkbox
									label='I agree the rule'
									className='w-4 h-4 rounded-sm '
									checked={true}
								/>
							</div> */}
						</div>
					</DialogBody>
					<DialogFooter>
						<Button
							onClick={handleSubmitTrade}
							className='w-full bg-yellow-700'
						>
							<span className='font-bold text-blue-gray-900'>Confirm</span>
						</Button>
					</DialogFooter>
				</Dialog>
			</>
		</div>
	);
};

export default Board;
