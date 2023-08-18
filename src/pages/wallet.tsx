import Layout from '@/Layout';
import DoughnutChart from '@/components/Wallet/DoughnutChart';
import React from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/global/ProtectedRoute';
import { useSelector } from 'react-redux';

const menuItems = [
	{
		id: 1,
		title: 'Deposit',
		url: '/deposit',
	},
	{
		id: 2,
		title: 'Withdraw',
		url: '/withdraw',
	},
	{
		id: 3,
		title: 'Convert',
		url: '/convert',
	},
	{
		id: 4,
		title: 'Send',
		url: '/send',
	},
];

const Wallet = () => {
	const { user } = useSelector((state: any) => state.auth);
	const totalBalance = Number(user?.m_balance + user?.ai_balance).toFixed(2);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='py-20  px-2 min-h-[100vh] wallet-wrapper'>
					<div className='px-4 text-blue-gray-200 py-6 mx-auto rounded-lg bg-black_2 md:w-7/12'>
						<div className='space-y-2'>
							<p className='text-xs text-blue-gray-800'>Total Balance</p>
							<p className=''>${totalBalance}</p>
						</div>
						<hr className='my-2 border border-blue-gray-800 ' />
						<div>
							<DoughnutChart />
						</div>
						<hr className='my-2 border border-blue-gray-800 ' />
						<div className='mt-4 md:px-4'>
							<ul className='grid grid-cols-4 gap-2'>
								{menuItems.map((item) => (
									<Link href={item.url} key={item.id}>
										<button className='w-full p-2 text-xs font-bold bg-yellow-800 rounded-lg text-blue-gray-900 hover:bg-blue-gray-800 hover:text-blue-gray-100 md:text-sm'>
											{item.title}
										</button>
									</Link>
								))}
							</ul>
						</div>
						{/* <hr className='my-4 border border-blue-gray-800 ' /> */}
						<div className='grid grid-cols-2 py-1 my-4 '>
							<p className=' text-blue-gray-100'>Transactions History</p>
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Wallet;
