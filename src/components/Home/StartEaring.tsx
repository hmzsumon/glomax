import Link from 'next/link';
import React from 'react';
const referId = process.env.NEXT_PUBLIC_DEFAULT_REFER_ID;

const StartEaring = () => {
	return (
		<div className='flex gap-6 px-4 flex-col items-center justify-center h-[200px] w-full bg-black'>
			<h1 className='text-2xl font-bold md:text-3xl'>Start Earing Today!</h1>
			<div className=' flex items-center justify-center w-full md:w-[20%]'>
				<Link
					href={{
						pathname: '/register',
					}}
					className='w-full py-3 mx-auto font-semibold text-center text-gray-800 bg-yellow-700 rounded '
				>
					<button>Sign Up Now</button>
				</Link>
			</div>
		</div>
	);
};

export default StartEaring;
