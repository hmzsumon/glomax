import Layout from '@/Layout';
import DoughnutChart from '@/components/Wallet/DoughnutChart';
import React from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/global/ProtectedRoute';
import { useSelector } from 'react-redux';
import WalletHistory from '@/components/Wallet/WalletHistory';

const menuItems = [
	{
		id: 1,
		title: 'Deposit',
		url: '/deposits',
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
	const totalBalance = Number(
		user?.m_balance + user?.ai_balance + user?.e_balance
	).toFixed(2);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-2 pt-20 pb-24 '>
					<div className='px-4 py-6 mx-auto rounded-lg text-blue-gray-200 bg-black_2 md:w-7/12'>
						<div className='space-y-2'>
							<p className='text-xs text-blue-gray-300'>Total Balance</p>
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
						<div className=''>
							<WalletHistory />
						</div>
						<br />
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Wallet;
