import React from 'react';
import Image from 'next/image';

const Block = () => {
	return (
		<div>
			<div className='mx-auto my-6 md:w-1/2'>
				<Image
					src='/rapid-logo1.png'
					alt='block'
					width={500}
					height={500}
					className='w-20 mx-auto my-6 md:w-60'
				/>
				<Image
					src='/block.png'
					alt='block'
					width={500}
					height={500}
					className='w-32 mx-auto my-6 md:w-60'
				/>
				<h1 className='text-2xl text-center text-red-500'>
					Your account has been blocked!
				</h1>
				<div className='flex items-center justify-center '>
					<button>
						<a
							href='https://t.me/glomax2020'
							target='_blank'
							rel='noopener noreferrer'
							className='text-yellow-700 '
						>
							Contact with customer support
						</a>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Block;
