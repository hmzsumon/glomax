import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import { HistoryIcon } from '@/global/icons/CommonIcons';
import { Dialog, DialogBody, Input } from '@material-tailwind/react';
import { BiTransferAlt } from 'react-icons/bi';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { PulseLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { useConvertMutation } from '@/features/convert/convertApi';
import { fetchBaseQueryError } from '@/services/helpers';
import ClipLoader from 'react-spinners/ClipLoader';
import { IoCloseCircleOutline } from 'react-icons/io5';
import UserTradeRecords from '@/components/Wingame/UserTradeRecords';
import ConvertRecords from '@/components/Convert/ConvertRecords';
import { useRouter } from 'next/router';
import { HiArrowSmLeft } from 'react-icons/hi';
import { useLoadUserQuery } from '@/features/auth/authApi';
import { Select, Option, SelectProps } from '@material-tailwind/react';
import { AnyNode } from 'postcss';

const Convert = () => {
	const { refetch } = useLoadUserQuery();
	const router = useRouter();
	const { user } = useSelector((state: any) => state.auth);
	const [convert, { isError, isLoading, isSuccess, error }] =
		useConvertMutation();
	const [amount, setAmount] = useState<number>(0);
	const [convertAmount, setConvertAmount] = useState<number>(0);
	const [main, setMain] = useState<boolean>(true);
	const [to_wallet, setToWallet] = useState<string>('');

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

	// handle amount change
	const handleAmountChange = (e: any) => {
		const { value } = e.target;
		if (value < 0) {
			toast.error('Amount cannot be negative');
			return;
		}
		setAmount(value);
		setConvertAmount(value);
	};

	const handleSelectChange: SelectProps['onChange'] = (value) => {
		if (typeof value === 'string') {
			setToWallet(value);
		}
	};

	// handle convert
	const handleConvert = () => {
		console.log('value', to_wallet);
		if (!amount || amount < 1) {
			toast.error('Please enter amount');
			return;
		}
		// check if user m_balance is less than 0.1
		// const reamingBalance = Number(user?.m_balance - amount);
		// if (reamingBalance < 0.1) {
		// 	toast.error('Insufficient balance');
		// 	return;
		// }
		console.log('ccc', to_wallet);

		convert({
			amount,
			from: 'e_balance',
			to: to_wallet,
			id: user?._id,
		});
	};

	useEffect(() => {
		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
		if (isSuccess) {
			refetch();
			toast.success('Convert successful');
			setAmount(0);
			setConvertAmount(0);
		}
	}, [isError, isSuccess, error]);

	return (
		<Layout>
			<ProtectedRoute>
				<div className='h-screen px-2 py-20 md:h-auto withdraw-wrapper'>
					<div className='relative px-4 py-6 mx-auto rounded-lg bg-black_2 md:w-7/12'>
						<div className='flex items-center justify-between mb-4'>
							<div>
								<HiArrowSmLeft
									className='text-2xl cursor-pointer text-blue-gray-300 hover:text-blue-700'
									onClick={() => router.back()}
								/>
							</div>
							<div className='ml-2 '>
								<h1 className='-mb-1 text-xl font-bold text-blue-gray-200 '>
									Convert
								</h1>
							</div>
							<span className='flex cursor-pointer' onClick={handleOpen}>
								<HistoryIcon h={4} w={4} color={'gray'} />
								<small className='text-[.7rem] text-blue-gray-600 '>
									History
								</small>
							</span>
						</div>

						<div className='space-y-4 '>
							<div className='px-2 rounded-sm bg-black_3'>
								<div className='grid grid-cols-5 '>
									<div className='col-span-4 py-2 space-y-2 text-blue-gray-300'>
										<div className='grid grid-cols-5'>
											<div className=' col-span-2'>
												<h2>From </h2>
											</div>

											<div className=' col-span-3 '>
												<h2 className=''>Earn Balance</h2>
											</div>
										</div>
										<div className='flex items-center justify-around'>
											<FaLongArrowAltDown className=' text-blue-gray-600' />
										</div>
										<div className='grid grid-cols-7'>
											<div className=' col-span-2'>
												<h2 className=''>To </h2>
											</div>

											<div className=' col-span-5'>
												<div className='w-full'>
													<Select
														label='Select Wallet'
														onChange={handleSelectChange}
													>
														<Option value='ai'>Ai Balance</Option>
														<Option value='main'>Trade Balance</Option>
													</Select>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='my-6 '>
							<div className=''>
								<Input
									type='text'
									color='blue'
									label='Enter Amount'
									className=' focus:text-blue-gray-100'
									value={amount}
									onChange={handleAmountChange}
								/>

								<small className='flex items-center justify-between px-1 mt-1 text-blue-gray-700'>
									{main ? (
										<span className=''>
											Earn Balance
											{user?.e_balance >= 0 ? (
												<span className='mx-1 text-blue-gray-300'>
													{Number(user?.e_balance).toFixed(2)}
												</span>
											) : (
												<PulseLoader size={10} color={'#fff'} />
											)}
											USDT
										</span>
									) : (
										<span className=''>
											Ai Balance
											{user?.m_balance >= 0 ? (
												<span className='mx-1 text-blue-gray-300'>
													{Number(user?.ai_balance).toFixed(2)}
												</span>
											) : (
												<PulseLoader size={10} color={'#fff'} />
											)}
											USDT
										</span>
									)}
								</small>
							</div>
						</div>
						<hr className='my-2 border border-blue-gray-900 ' />
						<div className='grid grid-cols-2 gap-4 '>
							<div className='space-y-1 '>
								<p className='text-xs text-blue-gray-600'>Convert Amount</p>
								<p className='font-bold text-blue-gray-300'>
									<span>{Number(convertAmount).toFixed(2)}</span> USDT
								</p>
								{/* <p className='text-xs text-blue-gray-600'>
									Convert fee:{' '}
									<span className='italic font-bold text-blue-gray-300'>
										{main ? '3%' : '0%'}
									</span>{' '}
								</p> */}
							</div>

							<div className='flex items-center justify-center '>
								<button
									className='w-full py-2 font-bold bg-yellow-700 rounded-lg text-blue-gray-900 disabled:opacity-50 disabled:cursor-not-allowed '
									disabled={!amount || amount < 1 || isLoading}
									onClick={handleConvert}
								>
									{isLoading ? (
										<ClipLoader size={20} color={'#fff'} />
									) : (
										<span>Convert</span>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
				<>
					<Dialog
						open={open}
						handler={handleOpen}
						className='px-0 overflow-auto text-white bg-black_2'
					>
						<div className='flex items-center justify-center py-3 '>
							<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
								My Trade Record
							</h4>
							<IoCloseCircleOutline
								className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
								onClick={handleOpen}
							/>
						</div>
						<hr className='my-2 border border-black_3' />
						<DialogBody className='px-0 overflow-auto '>
							<ConvertRecords open={open} />
						</DialogBody>
					</Dialog>
				</>
			</ProtectedRoute>
		</Layout>
	);
};

export default Convert;
