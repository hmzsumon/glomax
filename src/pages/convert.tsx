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

const Withdraw = () => {
	const { refetch } = useLoadUserQuery();
	const router = useRouter();
	const { user } = useSelector((state: any) => state.auth);
	const [convert, { isError, isLoading, isSuccess, error }] =
		useConvertMutation();
	const [amount, setAmount] = useState<number>(0);
	const [convertAmount, setConvertAmount] = useState<number>(0);
	const [main, setMain] = useState<boolean>(true);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

	// handle convert from change
	const handleConvertFromChange = () => {
		setMain(!main);
	};

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

	// handle convert
	const handleConvert = () => {
		if (!amount || amount < 1) {
			toast.error('Please enter amount');
			return;
		}
		convert({
			amount: Number(amount),
			from: main ? 'main' : 'ai',
			to: main ? 'ai' : 'main',
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
										<div className='flex items-center justify-between'>
											<h2>From </h2>
											{main ? (
												<h2 className=''>Main Balance</h2>
											) : (
												<h2 className=''>Ai Balance</h2>
											)}
											<IoIosArrowForward className=' text-blue-gray-600' />
										</div>
										<div className='flex items-center justify-around'>
											<FaLongArrowAltDown className=' text-blue-gray-600' />
										</div>
										<div className='flex items-center justify-between'>
											<h2 className=''>To </h2>
											{main ? (
												<h2 className=''>Ai Balance</h2>
											) : (
												<h2 className=''>Main Balance</h2>
											)}
											<IoIosArrowForward className=' text-blue-gray-600' />
										</div>
									</div>
									<div className='flex items-center justify-center col-span-1 '>
										<BiTransferAlt
											className='text-3xl text-yellow-700 rotate-90 cursor-pointer '
											onClick={handleConvertFromChange}
										/>
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
											Main Balance
											{user?.m_balance ? (
												<span className='mx-1 text-blue-gray-300'>
													{Number(user?.m_balance).toFixed(2)}
												</span>
											) : (
												<PulseLoader size={10} color={'#fff'} />
											)}
											USDT
										</span>
									) : (
										<span className=''>
											Ai Balance
											{user?.m_balance ? (
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
									disabled={!amount || amount < 1}
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

export default Withdraw;
