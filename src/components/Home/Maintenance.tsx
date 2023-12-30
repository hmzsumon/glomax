import React from 'react';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Maintenance = () => {
	return (
		<div className='flex items-center justify-center h-screen '>
			<div className='text-center'>
				<h1 className='text-4xl font-bold text-red-500 mb-4'>
					Under Maintenance
				</h1>
				<Image
					src='/maintenance.gif'
					alt='Maintenance'
					width={300} // set the width you desire
					height={200} // set the height you desire
					className='mb-8 mx-auto'
				/>
				<p className='text-gray-700'>
					Sorry for the inconvenience. We are currently undergoing maintenance.
				</p>
				<div className=' my-1'>
					<p className='text-gray-500 my-1'>
						Join our official Telegram group to get all updates of Global X
					</p>
					<button>
						<a
							href='https://t.me/+_F020xmmsFAxMWI1'
							target='_blank'
							rel='noopener noreferrer'
							className='text-yellow-700 flex items-center justify-center gap-2 '
						>
							Join our Telegram
							<FaExternalLinkAlt />
						</a>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Maintenance;
