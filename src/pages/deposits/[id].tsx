import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';
import { HiArrowSmLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import CopyToClipboard from '@/global/CopyToClipboard';
import { useGetDepositQuery } from '@/features/deposit/depositApi';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useLoadUserQuery } from '@/features/auth/authApi';

const Deposit = () => {
	useLoadUserQuery();
	const router = useRouter();
	const { id } = router.query;
	const { data, isLoading } = useGetDepositQuery(id);
	const { deposit: record } = data || {};
	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-2 py-20 md:py-24 '>
					<div className='px-2 py-4 mx-auto mt-10 rounded md:w-6/12 bg-black_2'>
						<div className='flex items-center justify-between '>
							<div className=''>
								<HiArrowSmLeft
									className='text-2xl cursor-pointer text-blue-gray-300 hover:text-blue-700'
									onClick={() => router.back()}
								/>
							</div>
							<div className=''>
								<h2 className='text-xl text-center text-blue-gray-300'>
									Deposit Details
								</h2>
							</div>
							<div className='cursor-pointer '></div>
						</div>

						<hr className='my-2 border border-black_3' />

						{isLoading ? (
							<div className='flex items-center justify-center h-[40vh]'>
								<ScaleLoader color='#e65100' />
							</div>
						) : (
							<>
								<div className='my-8 '>
									<div className='px-1 py-1 space-y-2 list-none text-blue-gray-400 '>
										<div className='grid grid-cols-2'>
											<li>Amount</li>
											<li className='text-end'>
												{Number(record?.amount).toLocaleString('en-US', {
													style: 'currency',
													currency: 'USD',
												})}
											</li>
										</div>
										<div className='grid grid-cols-2'>
											<li>Date</li>
											<li className='text-xs text-end'>
												{new Date(record?.createdAt).toLocaleDateString(
													'en-US',
													{
														year: 'numeric',
														month: 'short',
														day: 'numeric',
														hour: 'numeric',
														minute: 'numeric',
													}
												)}
											</li>
										</div>

										<div className='grid grid-cols-2'>
											<li>
												<p className='capitalize'>Transaction ID</p>
											</li>
											<li className='text-xs text-end'>{record?._id}</li>
										</div>
										<div className='grid grid-cols-2'>
											<li>Status</li>
											<li className='text-end'>
												{record?.status === 'approved' && (
													<p className='capitalize  text-[#388E3C]'>Success</p>
												)}
											</li>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Deposit;
