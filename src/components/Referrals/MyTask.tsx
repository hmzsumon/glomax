import React from 'react';
import { FiUserPlus, FiUser } from 'react-icons/fi';
import { BsTrophyFill } from 'react-icons/bs';

const MyTask = () => {
	return (
		<div className=''>
			<div className='flex items-center gap-2 '>
				<BsTrophyFill className='inline-block mr-2 text-2xl text-gray-400 cursor-pointer md:text-4xl ' />
				<h1 className='text-xl font-bold  md:text-4xl'>My Rewards</h1>
			</div>
			<div className='my-6 '>
				<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
					<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									Task Type
								</th>
								<th scope='col' className='px-6 py-3'>
									Reward Type
								</th>
								<th scope='col' className='px-6 py-3'>
									Distribution Date
								</th>
								<th scope='col' className='px-6 py-3'>
									Bonus
								</th>
								<th scope='col' className='px-6 py-3'>
									Status
								</th>
							</tr>
						</thead>
						{/* <tbody>
							<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
								<th
									scope='row'
									className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									<div className='flex items-center space-x-2 '>
										<p>123456789</p>
									</div>
								</th>
								<td className='px-6 py-4'>Silver</td>
								<td className='px-6 py-4'>Laptop</td>
								<td className='px-6 py-4'>$2999</td>
								<td className='px-6 py-4'>$2999</td>
							</tr>
						</tbody> */}
					</table>
				</div>
			</div>
		</div>
	);
};

export default MyTask;
