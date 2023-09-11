import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import { HistoryIcon } from '@/global/icons/CommonIcons';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { HiArrowSmLeft } from 'react-icons/hi';
import CopyToClipboard from '@/global/CopyToClipboard';
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	Checkbox,
} from '@material-tailwind/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import {
	useCreateDepositRequestMutation,
	useGetMyDepositsQuery,
} from '@/features/deposit/depositApi';

import DepositRecords from '@/components/Deposits/DepositRecords';
import { useLoadUserQuery } from '@/features/auth/authApi';
const Deposit = () => {
	useLoadUserQuery();
	const [createDepositRequest, { isError, isSuccess, isLoading, error }] =
		useCreateDepositRequestMutation();
	const router = useRouter();

	const {
		data,
		refetch,
		isLoading: h_isLoading,
		isSuccess: h_isSuccess,
	} = useGetMyDepositsQuery(undefined);

	const { deposits } = data || [];
	// console.log('deposits', deposits);

	const [textError, setTextError] = useState<string>('');
	const [tnxError, setTnxError] = useState<string>('');
	const [amount, setAmount] = useState<number>(10);
	const [transactionId, setTransactionId] = useState<string>('');
	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [bonusTex, setBonusTex] = useState<boolean>(false);
	const [is_bonus, setIs_bonus] = useState<boolean>(false);
	const handleOpen = () => setOpen(!open);
	const handleOpen2 = () => {
		setOpen2(!open2);
		refetch();
	};

	const handleChange = (e: any) => {
		setAmount(e.target.value);
		if (e.target.value < 10) {
			setTextError('Minimum amount is $10');
		} else {
			setTextError('');
		}

		if (e.target.value >= 10) {
			setBonusTex(true);
		} else {
			setBonusTex(false);
		}
	};

	const handleSubmit = async () => {
		if (amount < 10) {
			setTextError('Minimum amount is $10');
		} else {
			setTextError('');
			const data = {
				amount: amount,
				transactionId: transactionId,
				is_bonus: is_bonus,
			};

			// console.log('data', data);

			createDepositRequest(data);
			setAmount(10);
		}
	};

	useEffect(() => {
		if (isError && error) {
			if (
				typeof error === 'object' &&
				'status' in error &&
				(error.status as number) === 405
			) {
				setTnxError('The Transaction id is already used');
			} else {
				toast.error((error as fetchBaseQueryError).data.message);
			}
		}
		if (isSuccess) {
			setOpen(false);
			toast.success('Deposit request created successfully');
			setTransactionId('');
			setTnxError('');
		}
	}, [isError, isSuccess, error]);

	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-2 py-20 md:py-24 '>
					<div className='px-4 py-4 mx-auto rounded md:w-6/12 bg-black_2'>
						<div className='flex items-center justify-between '>
							<div className=''>
								<HiArrowSmLeft
									className='text-2xl cursor-pointer text-blue-gray-300 hover:text-blue-700'
									onClick={() => router.back()}
								/>
							</div>
							<div className=''>
								<h2 className='text-xl text-center text-blue-gray-300'>
									Deposit USDT
								</h2>
							</div>
							<div className='cursor-pointer '>
								<span onClick={handleOpen2}>
									<HistoryIcon h={6} w={6} color={'gray'} />
								</span>
							</div>
						</div>
						<div className='flex flex-col items-center justify-center my-4 '>
							<img src='/qr_code.png' alt='Deposit' className=' w-36 md:w-60' />
							<p className='my-3 text-blue-gray-400'>
								Send only USDT to this address
							</p>
						</div>
						<hr className='border border-black_3' />
						<div className='my-6 space-y-4 '>
							<div>
								<p className='text-sm text-blue-gray-400'>Network</p>
								<p className='text-blue-gray-100'>Tron (TRC20)</p>
							</div>
							<div>
								<p className='text-sm text-blue-gray-400'>Wallet Address</p>
								<div className='flex items-center justify-between'>
									<p className='text-sm text-blue-gray-100'>
										TMtMm2fgAxkBZxXQzw9UFvf4oddR2DPD73
									</p>
									<CopyToClipboard
										text={'TMtMm2fgAxkBZxXQzw9UFvf4oddR2DPD73'}
										size='text-md'
									/>
								</div>
							</div>

							<div className='px-4 py-4 space-y-2 text-xs bg-black_3 md:text-md'>
								<div className='flex items-center justify-between '>
									<p className='text-blue-gray-400 '>Minimum deposit</p>
									<p className='text-blue-gray-100 '> &gt;10 USDT </p>
								</div>
								<div className='flex items-center justify-between '>
									<p className='text-blue-gray-400 '>Expected arrival</p>
									<p className='text-blue-gray-100 '>
										{' '}
										1 network confirmation{' '}
									</p>
								</div>
								<div className='flex items-center justify-between '>
									<p className='text-blue-gray-400 '>Expected unlock</p>
									<p className='text-blue-gray-100 '>
										{' '}
										1 network confirmation{' '}
									</p>
								</div>
							</div>
						</div>
						<div className=''>
							<button
								className='w-full py-1 font-bold bg-yellow-700 rounded-sm text-blue-gray-900'
								onClick={handleOpen}
							>
								Confirm
							</button>
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
									Confirmation
								</h4>
								<IoCloseCircleOutline
									className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
									onClick={handleOpen}
								/>
							</div>
							<hr className='my-2 border border-black_3' />
							<DialogBody>
								<div className='space-y-4 '>
									<div className='relative flex flex-col gap-1 '>
										<label className='mb-1 ml-1 text-sm font-semibold text-gray-400 '>
											Enter Amount
										</label>
										<input
											className={`px-4 py-1 ${
												textError && 'border-red-500'
											} text-blue-gray-200 bg-transparent border rounded focus:outline-none`}
											type='number'
											value={amount}
											onChange={(e) => handleChange(e)}
										/>

										{textError && (
											<p className='text-xs text-red-500'>{textError}</p>
										)}
									</div>

									<div className='relative flex flex-col gap-1 '>
										<label className='mb-1 ml-1 text-sm font-semibold text-gray-400 '>
											Transaction id
										</label>
										<input
											className={`px-4 py-1 text-blue-gray-200 bg-transparent border rounded  focus:outline-none`}
											type='text'
											value={transactionId}
											onChange={(e) => setTransactionId(e.target.value)}
										/>

										<div className='flex items-center justify-between '>
											{tnxError ? (
												<p className='text-xs text-red-500'>{tnxError}</p>
											) : (
												<small>
													Please enter a valid transaction id otherwise your
													deposit will be rejected.
												</small>
											)}
										</div>
									</div>
									{amount >= 10 && (
										<div>
											<Checkbox
												label='I want to receive bonus.'
												color='yellow'
												labelProps={{
													className: 'text-xs text-blue-gray-400',
												}}
												checked={is_bonus}
												onChange={(e) => setIs_bonus(e.target.checked)}
											/>

											<p className='ml-10 -mt-1 text-xs'>
												if you claim the bonus, your trade volume will be
												increase 5X.
											</p>
										</div>
									)}
								</div>
							</DialogBody>
							<div className='px-4 pb-3 '>
								<button
									onClick={handleSubmit}
									className='w-full py-1 bg-yellow-700 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed '
									disabled={isLoading || amount < 10 || !transactionId}
								>
									{isLoading ? (
										<ScaleLoader color={'#36d7b7'} height={20} width={2} />
									) : (
										<span className='font-semibold text-blue-gray-900'>
											Confirm
										</span>
									)}
								</button>
							</div>
						</Dialog>
					</>
					{/* for history */}
					<>
						<Dialog
							open={open2}
							handler={handleOpen2}
							className='px-0 overflow-auto text-white bg-black_2'
						>
							<div className='flex items-center justify-center py-3 '>
								<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
									My Deposit Records
								</h4>
								<IoCloseCircleOutline
									className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
									onClick={handleOpen2}
								/>
							</div>
							<hr className='my-2 border border-black_3' />
							<DialogBody className='px-0 overflow-auto '>
								<DepositRecords records={deposits} />
							</DialogBody>
						</Dialog>
					</>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Deposit;
