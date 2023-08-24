import Layout from '@/Layout';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import RobotHeader from '@/components/AiRobot/RobotHeader';
import Market from '@/components/Trade/Market';
import ProtectedRoute from '@/global/ProtectedRoute';
import { HistoryIcon } from '@/global/icons/CommonIcons';
import { AiFillPlusCircle } from 'react-icons/ai';
import { ImDownload3 } from 'react-icons/im';
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react';
import { BiTransferAlt } from 'react-icons/bi';
import { HiArrowSmLeft } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import socketIOClient from 'socket.io-client';
import {
	Dialog,
	DialogBody,
	Checkbox,
	Typography,
} from '@material-tailwind/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useTickerContext } from '@/TickerContext';
import Link from 'next/link';
import {
	useCreateAiRobotMutation,
	useEditAiRobotMutation,
	useMyAiRobotQuery,
} from '@/features/aiRobot/aiRobotApi';

const CreateRobot = () => {
	const router = useRouter();
	const mode = router.query.mode as string;

	const {
		data,
		isLoading: r_isLoading,
		isError: r_isError,
		isSuccess: r_isSuccess,
		error: r_error,
	} = useMyAiRobotQuery(undefined, {
		skip: mode !== 'edit',
	});
	// console.log(data);
	const { aiRobot } = data || {};

	const { ticker } = useTickerContext();
	const { user } = useSelector((state: any) => state.auth);
	const [createAiRobot, { isLoading, isError, isSuccess, error }] =
		useCreateAiRobotMutation();

	const [
		editAiRobot,
		{
			isLoading: e_isLoading,
			isError: e_isError,
			isSuccess: e_isSuccess,
			error: e_error,
		},
	] = useEditAiRobotMutation();
	const { symbol } = useSelector((state: any) => state.trade);
	const l_symbol = symbol.toLowerCase();
	const [grid, setGrid] = useState<number>(1);
	const [amount, setAmount] = useState<number>(30);
	const [stateError, setStateError] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');
	const [minAmount, setMinAmount] = useState<number>(30);
	const [tickers, setTickers] = useState<any[]>([]);
	const [open, setOpen] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [autoCreate, setAutoCreate] = useState<boolean>(false);
	const handleOpen = () => setOpenModal(!openModal);

	useEffect(() => {
		if (mode === 'edit' && aiRobot) {
			setGrid(aiRobot?.grid_no);
			setAmount(aiRobot?.current_investment);
			setAutoCreate(aiRobot?.auto_create);

			if (aiRobot?.grid_no == 1) {
				setMinAmount(30);
			} else if (aiRobot?.grid_no == 2) {
				setMinAmount(50);
			} else if (aiRobot?.grid_no == 3) {
				setMinAmount(70);
			} else if (aiRobot?.grid_no >= 4 && aiRobot?.grid_no <= 170) {
				const additionalAmount = (aiRobot?.grid_no - 4) * 15;
				setMinAmount(80 + additionalAmount);
			}
		}
	}, [aiRobot, mode]);

	useEffect(() => {
		const socket = socketIOClient(
			'https://rapid-trade-api-8113f7eb458c.herokuapp.com'
		);
		socket.on('tickers', (data: any[]) => {
			setTickers(data);
		});

		return () => {
			socket.disconnect();
		};
	}, [symbol]);

	// handle set grid
	const handleSetGrid = (e: any) => {
		const gridValue = e.target.value;
		setGrid(gridValue);

		if (gridValue == 1) {
			setMinAmount(30);
		} else if (gridValue == 2) {
			setMinAmount(50);
		} else if (gridValue == 3) {
			setMinAmount(70);
		} else if (gridValue >= 4 && gridValue <= 170) {
			const additionalAmount = (gridValue - 4) * 15;
			setMinAmount(80 + additionalAmount);
		}
	};

	// handle set amount
	const handleSetAmount = (e: any) => {
		const newAmount = e.target.value;

		setAmount(newAmount);

		if (newAmount >= minAmount) {
			setAmount(newAmount);
			setStateError(false);
			setErrorText('');
			if (newAmount > user?.ai_balance) {
				setStateError(true);
				setErrorText('Insufficient balance');
			}
		} else {
			setStateError(true);
			setErrorText(
				`If Grid ${grid} Amount must be equal or greater than ${minAmount} USDT`
			);
		}
	};

	// handle create robot
	const handleCreateRobot = () => {
		const data = {
			investment: amount,
			pair: l_symbol,
			grid_no: grid,
			price_range:
				Number(ticker?.l).toFixed(2) + ' - ' + Number(ticker?.h).toFixed(2),
			last_price: ticker?.c,
			auto_create: autoCreate,
		};
		// console.log(data);
		createAiRobot(data);
	};

	// handle edit robot
	const handleEditRobot = () => {
		const data = {
			investment: amount,
			pair: l_symbol,
			grid_no: grid,
			price_range:
				Number(ticker?.l).toFixed(2) + ' - ' + Number(ticker?.h).toFixed(2),
			last_price: ticker?.c,
			robot_id: aiRobot?._id,
			auto_create: autoCreate,
		};
		editAiRobot(data);
	};

	useEffect(() => {
		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
		if (isSuccess) {
			toast.success('Ai-Robot created successfully');
			setAmount(0);
			setGrid(1);
			router.push('/ai-robot');
		}
	}, [isError, isSuccess, error]);

	useEffect(() => {
		if (e_isError && e_error) {
			toast.error((e_error as fetchBaseQueryError).data.message);
		}
		if (e_isSuccess) {
			toast.success('Ai-Robot updated successfully');
			router.push('/ai-robot');
		}
	}, [e_isError, e_isSuccess, e_error]);

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
									<p className=' text-blue-gray-300'>Lower Price</p>
									<div className='flex items-center p-2 pl-4 space-x-2 rounded-md bg-black_3 '>
										{ticker?.l ? (
											<p className=' text-blue-gray-100'>
												{Number(ticker?.l).toLocaleString('en-US', {
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
									<p className=' text-blue-gray-300'>Upper Price</p>
									<div className='flex items-center p-2 pl-4 space-x-2 rounded-md bg-black_3 '>
										{ticker?.h ? (
											<p className=' text-blue-gray-100'>
												{Number(ticker?.h).toLocaleString('en-US', {
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
									type='number'
									value={grid}
									placeholder='1-170'
									className='w-full p-2 rounded-md outline-none bg-black_3 placeholder-blue-gray-400'
									onChange={handleSetGrid}
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
							<div className=' flex items-center justify-between'>
								<h2 className=''>3. Investment</h2>
								<div className=' my-2 flex items-center gap-x-1 text-xs pr-2'>
									Avbl:{' '}
									<span
										className={`text-blue-gray-300 ${
											user?.ai_balance < amount && 'text-red-500'
										}`}
									>
										{Number(user?.ai_balance).toLocaleString('en-US', {
											minimumFractionDigits: 4,
										})}{' '}
										USDT
									</span>
									<span onClick={handleOpen}>
										<AiFillPlusCircle className='inline-block w-4 h-4 text-yellow-700 cursor-pointer' />
									</span>
								</div>
							</div>
							<div className='relative '>
								<input
									type='number'
									value={amount}
									placeholder={`=> ${minAmount}`}
									className={`w-full p-2 rounded-md ${
										stateError && 'border border-red-500'
									} outline-none bg-black_3 placeholder-blue-gray-400`}
									onChange={handleSetAmount}
								/>
								<span className='absolute right-3 top-2 text-blue-gray-200'>
									USDT
								</span>
							</div>

							{stateError && (
								<small>
									<span className='text-red-500 ml-1'>{errorText}</span>
								</small>
							)}
						</div>

						{/* Start Advance Option */}
						<div>
							<div className=' my-1 flex items-center justify-between'>
								<h2 className=''>4. Advance Option </h2>
							</div>
							<div className=''>
								<Checkbox
									label={
										<div>
											<Typography className='font-medium text-blue-gray-200'>
												Auto Create Ai Spot Grids
											</Typography>
											<Typography
												variant='small'
												className='font-normal text-blue-gray-500'
											>
												Ai Robot&apos;ll be able to create Ai Spot Grids after
												24 hours.
											</Typography>
										</div>
									}
									color='amber'
									containerProps={{
										className: '-mt-5',
									}}
									checked={autoCreate}
									onChange={(e) => setAutoCreate(e.target.checked)}
								/>
							</div>

							{/* {stateError && (
								<small>
									<span className='text-red-500 ml-1'>{errorText}</span>
								</small>
							)} */}
						</div>
						{/* End Advance Option */}

						{/* Start Submit Button */}
						<div className='my-4 '>
							<button
								className='w-full py-2 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-gray-800 bg-yellow-700 rounded-md '
								disabled={
									stateError ||
									!ticker?.l ||
									!ticker?.h ||
									!ticker?.c ||
									user?.ai_balance < amount ||
									!amount ||
									!grid
								}
								onClick={mode === 'edit' ? handleEditRobot : handleCreateRobot}
							>
								{mode === 'edit' ? 'Update Robot' : 'Create Robot'}
							</button>
						</div>
						{/* End Submit Button */}
					</div>
					<Market open={open} setOpen={setOpen} tickers={tickers} />
				</div>
				<>
					<Dialog
						open={openModal}
						handler={handleOpen}
						size='xs'
						className='text-white bg-black_2 px-0 overflow-auto'
					>
						<div className='py-3 px-2 '>
							<h4 className='text-xl font-bold  text-blue-gray-300'>
								Increase Balance
							</h4>
							<p className=' text-xs  text-blue-gray-400'>
								Unable to place order due to insufficient balance or want to
								increase balance. Convert assets from other wallet or deposit
								funds to place an order.
							</p>
							<IoCloseCircleOutline
								className='absolute text-2xl text-blue-gray-600 cursor-pointer right-3 top-2 hover:text-red-500'
								onClick={handleOpen}
							/>
						</div>
						<hr className='my-2 border border-black_3' />

						<DialogBody className=' px-2 overflow-auto'>
							<div className=' space-y-2'>
								<Link
									href='/deposit'
									className='flex items-center justify-between px-2 py-2 space-x-2 rounded-md bg-black_3'
								>
									<p className='text-xs text-blue-gray-300'>Deposit</p>
									<ImDownload3 className='text-xl text-blue-gray-300' />
								</Link>
								<Link
									href='/convert'
									className='flex items-center justify-between px-2 py-2 space-x-2 rounded-md bg-black_3'
								>
									<p className='text-xs text-blue-gray-300'>Convert</p>
									<BiTransferAlt className='text-xl text-blue-gray-300' />
								</Link>
							</div>
						</DialogBody>
					</Dialog>
				</>
			</ProtectedRoute>
		</Layout>
	);
};

export default CreateRobot;
