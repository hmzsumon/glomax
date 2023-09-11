import React from 'react';

const MakeUp = () => {
	return (
		<div className='px-6 md:px-10 '>
			<div className='px-2 py-6 bg-black_1'>
				<div className='space-y-2 '>
					<h2 className='text-2xl text-center text-blue-gray-100'>
						The numbers that make up Glomax
					</h2>
					<p className='text-center text-blue-gray-200'>
						From trading volume to number of active clients, we are happy to
						share with you the statistics that make us one of the leading
						traders in the world.
					</p>
				</div>
				<div className='grid gap-6 my-4 md:grid-cols-2 text-blue-gray-200'>
					<div className='flex flex-col items-center justify-center py-4 rounded bg-black_2'>
						<p className='text-2xl text-blue-gray-100'>$5.89 million </p>
						<p>Trading volume </p>
					</div>
					<div className='flex flex-col items-center justify-center py-4 rounded bg-black_2'>
						<p className='text-2xl text-blue-gray-100'>15,512</p>
						<p>Active clients </p>
					</div>
					{/* <div className='flex flex-col items-center justify-center py-4 rounded bg-black_2'>
						<p className='text-2xl text-blue-gray-100'>$1.50 billion</p>
						<p>Client withdrawals in Q2 2023</p>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default MakeUp;
