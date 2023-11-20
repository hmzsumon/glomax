import Layout from '@/Layout';
import RankMembers from '@/components/Rewards/RankMembers';
import {
	useGetRankMembersQuery,
	useLoadUserQuery,
	useMyRankRecordQuery,
} from '@/features/auth/authApi';
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

	const { data, isLoading } = useMyRankRecordQuery();
	const { rankRecord } = data || {};
	console.log(rankRecord);
	console.log(rankRecord?.ranks?.length);
	const ranks = [
		{
			id: 1,
			title: 'Premier',
			level1: 5,
			total: 30,
			bonus: 50,
			action: rankRecord?.ranks?.length >= 1 ? 'Claimed' : 'Claim',
			claimed: user?.rank === 'elite' ? true : false,
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
			action: rankRecord?.ranks?.length >= 2 ? 'Claimed' : 'Claim',

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
			action: rankRecord?.ranks?.length >= 3 ? 'Claimed' : 'Claim',

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
			action: rankRecord?.ranks?.length >= 4 ? 'Claimed' : 'Claim',
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
			action: rankRecord?.ranks?.length >= 5 ? 'Claimed' : 'Claim',
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
				<div className='px-1 pt-20 pb-24 reward-wrapper'>
					<div className='px-3 py-4 mx-auto md:w-6/12 opacity-95 bg-black_2'>
						<h2 className='text-xl font-bold text-center md:text-2xl text-blue-gray-300'>
							Rank & Reward
						</h2>
						<div className='my-4'>
							<div>
								<ul className='grid grid-cols-5 p-1 text-xs font-bold text-center uppercase border border-b-0 border-blue-700 text-blue-gray-300'>
									{headers.map((header) => (
										<li key={header.id} className={header.class}>
											{header.title}
										</li>
									))}
								</ul>
								<div className='p-1 space-y-3 border border-blue-700'>
									{ranks.map((rank) => (
										<ul
											key={rank.id}
											className='grid grid-cols-5 text-xs font-bold text-center uppercase border-blue-700 text-blue-gray-300 '
										>
											<li className='text-left '>{rank.title}</li>

											<li>
												{rank.level1}
												<FaUsers className='inline-block ml-1' />
											</li>
											<li>
												{rank.total}
												<FaUsers className='inline-block ml-1' />
											</li>
											<li>$ {rank.bonus}</li>
											<li className='text-right '>
												{rank.btnActive ? (
													<Link href='/rank-claim'>
														<button className='px-2 py-1 bg-green-500 rounded-lg text-blue-gray-100 disabled:opacity-50 disabled:cursor-not-allowed '>
															{rank.action}
														</button>
													</Link>
												) : (
													<button
														className={`bg-black_3 px-2 py-1 rounded-lg
														${
															rank.action === 'Claimed'
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
								{/* Star Marvelous */}
								<ul className='grid items-center grid-cols-3 my-4 border border-green-500 text-blue-gray-200'>
									<li className='flex items-center justify-center h-full border-r border-green-500 '>
										<h2>Marvelous</h2>
									</li>
									<li className='flex flex-col items-center justify-center h-full text-xs text-center border-r border-green-500'>
										<p>5 Glorious Rank </p>
										<p>Your Direct Refer</p>
										<p>Total Team - 600</p>
									</li>
									<li className='p-2 text-xs text-center '>
										<p>Bonus - 500$</p>
										<p>Monthly Salary-200$ (3 Month)</p>
										<p>Incentive - 3 Day, 7 Day & Monthly</p>
									</li>
								</ul>{' '}
								{/* End Marvelous */}
								{/* Star Supreme */}
								<ul className='grid items-center grid-cols-3 my-4 border border-orange-500 text-blue-gray-200'>
									<li className='flex items-center justify-center h-full border-r border-orange-500 '>
										<h2>Supreme</h2>
									</li>
									<li className='flex flex-col items-center justify-center h-full text-xs text-center border-r border-orange-500 '>
										<p>5 Marvelous Rank </p>
										<p>Your Direct Refer</p>
										<p>Total Team - 1000</p>
									</li>
									<li className='p-2 text-xs text-center '>
										<p>Bonus - 2000$</p>
										<p>Monthly Salary-500$ (3 Month)</p>
										<p>Incentive - 3 Day, 7 Day & Monthly</p>
									</li>
								</ul>
								{/* End Supreme */}
							</div>
						</div>
						{/* Start Rank members */}
						{user?.rank === 'glorious' && <RankMembers />}
						{/* EndRank members */}
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Rewards;
