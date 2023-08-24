import React, { useState } from 'react';
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
} from '@material-tailwind/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
const Deposit = () => {
	const router = useRouter();

	const [textError, setTextError] = useState<string>('');
	const [amount, setAmount] = useState<any>();
	const [transactionId, setTransactionId] = useState<string>('');
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (parseFloat(e.target.value) < 10) {
			setTextError('Minimum amount is $10');
		} else {
			setTextError('');
		}
		setAmount(parseFloat(e.target.value));
	};

	const handleSubmit = async () => {
		if (amount < 10) {
			setTextError('Minimum amount is $10');
		} else {
			setTextError('');
			const data = {};
		}
	};
	return (
		<Layout>
			<ProtectedRoute>
				<div className='md:py-24 py-20 px-2 '>
					<div className='mx-auto md:w-6/12 py-4 px-4 rounded bg-black_2'>
						<div className=' flex items-center justify-between '>
							<div className=' '>
								<HiArrowSmLeft
									className='text-2xl text-blue-gray-300 cursor-pointer hover:text-blue-700'
									onClick={() => router.back()}
								/>
							</div>
							<div className='  '>
								<h2 className=' text-center text-xl text-blue-gray-300'>
									Deposit USDT
								</h2>
							</div>
							<div className=' cursor-pointer'>
								<HistoryIcon h={6} w={6} color={'gray'} />
							</div>
						</div>
						<div className=' flex flex-col items-center justify-center my-4'>
							<img src='/qr_code.png' alt='Deposit' className=' w-36 md:w-60' />
							<p className=' my-3 text-blue-gray-400'>
								Send only USDT to this address
							</p>
						</div>
						<hr className=' border border-black_3 ' />
						<div className=' space-y-4 my-6'>
							<div>
								<p className='text-blue-gray-400 text-sm'>Network</p>
								<p className='text-blue-gray-100'>Tron (TRC20)</p>
							</div>
							<div>
								<p className='text-blue-gray-400 text-sm'>Wallet Address</p>
								<div className='flex items-center justify-between'>
									<p className='text-blue-gray-100 text-sm'>
										TMtMm2fgAxkBZxXQzw9UFvf4oddR2DPD73
									</p>
									<CopyToClipboard
										text={'TMtMm2fgAxkBZxXQzw9UFvf4oddR2DPD73'}
										size='text-md'
									/>
								</div>
							</div>

							<div className='bg-black_3 text-xs md:text-md space-y-2 px-4 py-4'>
								<div className=' flex items-center justify-between'>
									<p className='text-blue-gray-400 '>Minimum deposit</p>
									<p className='text-blue-gray-100 '> &gt;10 USDT </p>
								</div>
								<div className=' flex items-center justify-between'>
									<p className='text-blue-gray-400 '>Expected arrival</p>
									<p className='text-blue-gray-100 '>
										{' '}
										1 network confirmation{' '}
									</p>
								</div>
								<div className=' flex items-center justify-between'>
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
								className=' bg-yellow-700 w-full text-blue-gray-900 font-bold py-1 rounded-sm '
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
								<div className=' space-y-4'>
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
											<small>
												Please enter a valid transaction id otherwise your
												deposit will be rejected.
											</small>
										</div>
									</div>
								</div>
							</DialogBody>
							<div className=' px-4 pb-3'>
								<button
									onClick={handleSubmit}
									className='w-full py-1 rounded-sm bg-yellow-700'
								>
									<span className='font-bold text-blue-gray-900'>Confirm</span>
								</button>
							</div>
						</Dialog>
					</>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Deposit;
