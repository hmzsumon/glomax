import Layout from '@/Layout';
import DoughnutChart from '@/components/Wallet/DoughnutChart';
import React from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/global/ProtectedRoute';
import { useSelector } from 'react-redux';
import WalletHistory from '@/components/Wallet/WalletHistory';

const Send = () => {
	const { user } = useSelector((state: any) => state.auth);

	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-2 pt-20 pb-24 '>
					<div className='px-4 py-6 mx-auto rounded-lg text-blue-gray-200 bg-black_2 md:w-7/12'>
						<div className='space-y-2'>
							<h2 className='text-2xl text-center uppercase text-blue-gray-300 '>
								USDT send rules
							</h2>
						</div>
						<hr className='my-2 border border-blue-gray-800 ' />

						<div className='p-8 mx-auto my-10 space-y-2 border border-orange-700 md:w-7/12 '>
							<p className='text-center '>
								Your Rank is
								<span className='italic font-bold text-blue-700 uppercase'>
									{' '}
									{user?.rank}
								</span>
							</p>
							<p className='text-center '>
								Once you reach to the Rank of
								<span className='italic font-bold text-orange-700 uppercase'>
									{' '}
									MAJESTIC
								</span>
								, then you will be able use the facility of send option.
							</p>
							<div className='text-center '>
								<Link
									href='/rewards'
									className='text-xs font-bold text-blue-700 underline hover:text-blue-900 '
								>
									Learn more about ranks
								</Link>
							</div>
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Send;
