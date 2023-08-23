import Link from 'next/link';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import { PiChartLineDuotone } from 'react-icons/pi';

const BeforeCreate = () => {
	return (
		<div>
			<section className=' flex flex-col justify-center  mx-auto'>
				<div className='  my-5 p-5 space-y-3 rounded-md border border-yellow-700 '>
					<div className=' items-center flex gap-x-2'>
						<PiChartLineDuotone className=' text-2xl' />
						<h4 className='text-blue-gray-200 text-xl font-semibold'>
							Ai Spot Grid
						</h4>
					</div>

					<p className='text-gray-500 text-sm'>
						Buy low and sell high 24/7 automatically with just one click.
					</p>

					<div className='flex gap-x-2'>
						<GiCheckMark className='text-green-500' />
						<h4 className='text-gray-500 font-body'>Volatile Markets</h4>
					</div>

					<div className='flex gap-x-2'>
						<GiCheckMark className='text-green-500' />
						<h4 className='text-gray-500 font-body'>Preset Ranges</h4>
					</div>

					<div className='flex justify-between items-center'>
						<Link
							href={{
								pathname: '/create-robot',
								query: { mode: 'create' },
							}}
							className='flex items-center gap-x-2 border cursor-pointer transition-all duration-200 hover:scale-110 p-2 rounded-md'
						>
							<p className='text-yellow-900'>Create</p>
							<BsArrowRight className='text-yellow-900' />
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default BeforeCreate;
