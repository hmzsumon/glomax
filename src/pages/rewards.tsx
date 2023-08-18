import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';

const headers = [
	{
		id: 1,
		title: 'Rank',
		class: 'text-left',
	},
	{
		id: 2,
		title: 'Level-1',
		class: 'text-center',
	},
	{
		id: 3,
		title: 'Level-2',
		class: 'text-center',
	},
	{
		id: 4,
		title: 'Level-3',
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

const ranks = [
	{
		id: 1,
		title: 'Premier',
		level1: 5,
		level2: 10,
		level3: 15,
		bonus: 30,
		action: 'Claim',
	},
	{
		id: 2,
		title: 'Elite',
		level1: 8,
		level2: 15,
		level3: 25,
		bonus: 50,
		action: 'Claim',
	},
	{
		id: 3,
		title: 'Majestic',
		level1: 12,
		level2: 25,
		level3: 60,
		bonus: 100,
		action: 'Claim',
	},
	{
		id: 4,
		title: 'Royal',
		level1: 18,
		level2: 45,
		level3: 100,
		bonus: 180,
		action: 'Claim',
	},
	{
		id: 5,
		title: 'Glorious',
		level1: 40,
		level2: 80,
		level3: 250,
		bonus: 300,
		action: 'Claim',
	},
];

const Rewards = () => {
	return (
		<Layout>
			<ProtectedRoute>
				<div className='py-20 reward-wrapper'>
					<div className='md:w-6/12 mx-auto opacity-95 bg-black_2 py-4 px-3'>
						<h2 className=' text-xl md:text-2xl text-center font-bold text-blue-gray-300'>
							Rank & Reward
						</h2>
						<div className='my-4'>
							<div>
								<ul className='border border-blue-700 p-1 border-b-0 grid grid-cols-6 text-xs text-center text-blue-gray-300 font-bold uppercase'>
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
											className='grid  grid-cols-6 text-xs text-center text-blue-gray-300 font-bold uppercase'
										>
											<li className=' text-left'>{rank.title}</li>
											<li>{rank.level1}</li>
											<li>{rank.level2}</li>
											<li>{rank.level3}</li>
											<li>$ {rank.bonus}</li>
											<li className=' text-right'>
												<button className='bg-black_3 text-blue-gray-100 px-2 py-1 rounded-lg'>
													{rank.action}
												</button>
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
										<h2>Marvelous</h2>
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
