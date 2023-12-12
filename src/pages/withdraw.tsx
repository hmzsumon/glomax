import React, { useState } from 'react';
import Layout from '@/Layout';
import LeftContent from '@/components/Withdraw/LeftContent';
import ProtectedRoute from '@/global/ProtectedRoute';
import { HistoryIcon } from '@/global/icons/CommonIcons';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useGetMyWithdrawRequestsQuery } from '@/features/withdraw/withdrawApi';
import WithdrawRecords from '@/components/Withdraw/WithdrawRecords';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AddPaymentMethod from '@/components/Withdraw/AddPaymentMethod';
import { useLoadUserQuery } from '@/features/auth/authApi';

const Withdraw = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);

	// check if user has completed kyc
	const router = useRouter();
	React.useEffect(() => {
		if (!user?.kyc_verified) {
			router.push('/kyc');
		}
	}, [user]);

	const { data, refetch, isLoading, isSuccess, isError, error } =
		useGetMyWithdrawRequestsQuery(undefined);
	const { withdraws } = data || [];
	const { withdrawDetails } = data || {};
	// console.log('withdraws', withdraws);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-2 py-20 '>
					<div className='relative px-4 py-6 mx-auto rounded-lg bg-black_2 md:w-7/12'>
						<div className='flex items-center justify-between mb-4'>
							<div className='ml-2 '>
								<h1 className='-mb-1 font-bold '>Withdraw USDT</h1>
								<small className=' text-[0.6rem] text-blue-gray-600'>
									Withdraw USDT to crypto & Binance Pay{' '}
								</small>
							</div>
							<div className='flex cursor-pointer' onClick={handleOpen}>
								<HistoryIcon h={4} w={4} color={'gray'} />

								<small className='text-[.7rem] text-blue-gray-600 '>
									History
								</small>
							</div>
						</div>

						<div className=''>
							{user?.is_payment_method ? <LeftContent /> : <AddPaymentMethod />}
						</div>
					</div>
				</div>
				{/* for history */}
				<>
					<Dialog
						open={open}
						handler={handleOpen}
						className='px-0 overflow-auto text-white bg-black_2'
					>
						<div className='flex items-center justify-center py-3 '>
							<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
								My Withdraw Records
							</h4>
							<IoCloseCircleOutline
								className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
								onClick={handleOpen}
							/>
						</div>
						<hr className='my-2 border border-black_3' />
						<DialogBody className='px-0 overflow-auto '>
							<WithdrawRecords records={withdraws} />
						</DialogBody>
					</Dialog>
				</>
			</ProtectedRoute>
		</Layout>
	);
};

export default Withdraw;
