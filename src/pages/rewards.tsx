import Layout from '@/Layout';
import { useLoadUserQuery } from '@/features/auth/authApi';
import ProtectedRoute from '@/global/ProtectedRoute';
import Link from 'next/link';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const headers = [
	{
		id: 1,
		title: 'Rank',
		class: 'text-left',
	},
	{
		id: 2,
		title: 'Direct',
		class: 'text-center',
	},
	{
		id: 3,
		title: 'Total Team',
		class: 'text-center',
	},

	{
		id: 5,
		title: 'Bonus',
		class: 'text-center',
	},
	{
		id: 6,
		title: 'Action',
		class: 'text-right',
	},
];

const Rewards = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);

	const ranks = [
		{
			id: 1,
			title: 'Premier',
			level1: 5,
			total: 30,
			bonus: 50,
			action:
				user?.rank === 'premier' || user?.rank === 'elite'
					? 'Claimed'
					: 'Claim',
			claimed:
				user?.rank === 'premier' || user?.rank === 'elite' ? true : false,
			btnActive:
				user?.rank === 'member' && user?.rank_is_processing === true
					? true
					: false,
		},
		{
			id: 2,
			title: 'Elite',
			level1: 8,
			total: 50,
			bonus: 100,
			action: user?.rank === 'elite' ? 'Claimed' : 'Claim',
			claimed: user?.rank === 'elite' ? true : false,
			btnActive:
				user?.rank === 'premier' && user?.rank_is_processing === true
					? true
					: false,
		},
		{
			id: 3,
			title: 'Majestic',
			level1: 10,
			total: 70,
			bonus: 200,
			action: user?.rank === 'majestic' ? 'Claimed' : 'Claim',
			claimed: user?.rank === 'majestic' ? true : false,
			btnActive:
				user?.rank === 'elite' && user?.rank_is_processing === true
					? true
					: false,
		},
		{
			id: 4,
			title: 'Royal',
			level1: 12,
			total: 100,
			bonus: 300,
			action: user?.rank === 'royal' ? 'Claimed' : 'Claim',
			claimed: user?.rank === 'royal' ? true : false,
			btnActive:
				user?.rank === 'majestic' && user?.rank_is_processing === true
					? true
					: false,
		},
		{
			id: 5,
			title: 'Glorious',
			level1: 15,
			total: 150,
			bonus: 500,
			action: user?.rank === 'glorious' ? 'Claimed' : 'Claim',
			claimed: user?.rank === 'glorious' ? true : false,
			btnActive:
				user?.rank === 'royal' && user?.rank_is_processing === true
					? true
					: false,
		},
	];

	return (
		<Layout>
			<ProtectedRoute>
				<div className='pt-20 md:pb-24 h-screen md:h-[100%]  reward-wrapper px-1'>
					<div className='md:w-6/12 mx-auto opacity-95 bg-black_2 py-4 px-3'>
						<h2 className=' text-xl md:text-2xl text-center font-bold text-blue-gray-300'>
							Rank & Reward
						</h2>
						<div className='my-4'>
							<div>
								<ul className='border border-blue-700 p-1 border-b-0 grid grid-cols-5 text-xs text-center text-blue-gray-300 font-bold uppercase'>
									{headers.map((header) => (
										<li key={header.id} className={header.class}>
											{header.title}
										</li>
									))}
								</ul>
								<div className='border border-blue-700 p-1  space-y-3'>
									{ranks.map((rank) => (
										<ul
											key={rank.id}
											className='grid  grid-cols-5 text-xs text-center text-blue-gray-300 font-bold uppercase  border-blue-700 '
										>
											<li className=' text-left'>{rank.title}</li>

											<li>
												{rank.level1}
												<FaUsers className='inline-block ml-1' />
											</li>
											<li>
												{rank.total}
												<FaUsers className='inline-block ml-1' />
											</li>
											<li>$ {rank.bonus}</li>
											<li className=' text-right'>
												{rank.btnActive ? (
													<Link href='/rank-claim'>
														<button className='bg-green-500 text-blue-gray-100 px-2 py-1 rounded-lg'>
															{rank.action}
														</button>
													</Link>
												) : (
													<button
														className={`bg-black_3 px-2 py-1 rounded-lg
														${
															rank.claimed
																? 'bg-opacity-50  text-orange-800 cursor-not-allowed'
																: 'text-blue-gray-100'
														}
														`}
													>
														{rank.action}
													</button>
												)}
											</li>
										</ul>
									))}
								</div>
								<ul className=' border-green-500 grid grid-cols-3 items-center border my-4  text-blue-gray-200'>
									<li className=' border-green-500 flex items-center justify-center border-r  h-full'>
										<h2>Marvelous</h2>
									</li>
									<li className='border-green-500  flex flex-col items-center justify-center text-xs text-center border-r  h-full'>
										<p>5 Glorious Rank </p>
										<p>Holder Your Team</p>
									</li>
									<li className=' p-2 text-xs text-center'>
										<p>Bonus - 500$</p>
										<p>Monthly Salary-200$ (3 Month)</p>
										<p>Incentive - 3 Day, 7 Day & Monthly</p>
									</li>
								</ul>
								<ul className='border-orange-500 grid grid-cols-3 items-center border my-4  text-blue-gray-200'>
									<li className=' border-orange-500 flex items-center justify-center border-r  h-full'>
										<h2>Supreme</h2>
									</li>
									<li className=' border-orange-500 flex flex-col items-center justify-center text-xs text-center border-r  h-full'>
										<p>5 Marvelous Rank </p>
										<p>Holder Your Team</p>
									</li>
									<li className=' p-2 text-xs text-center'>
										<p>Bonus - 2000$</p>
										<p>Monthly Salary-500$ (3 Month)</p>
										<p>Incentive - 3 Day, 7 Day & Monthly</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Rewards;
