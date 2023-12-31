import React from 'react';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Maintenance = () => {
	return (
		<div className='flex items-center justify-center h-screen '>
			<div className='text-center'>
				<h1 className='mb-4 text-4xl font-bold text-green-500'>
					Download our new app
				</h1>

				{/* Download Button */}
				<div className='my-1 '>
					<p className='my-1 text-gray-500'>
						Download our new app from Google Play Store
					</p>
					<button>
						<a
							href='https://play.google.com/store/apps/details?id=com.wnapp.id1694165800345'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center gap-2 text-yellow-700 '
						>
							Download App
							<FaExternalLinkAlt />
						</a>
					</button>
				</div>

				<p className='text-gray-700'>
					Sorry for the inconvenience. We are currently undergoing maintenance.
				</p>
				<div className='my-1 '>
					<p className='my-1 text-gray-500'>
						Join our official Telegram group to get all updates of Global X
					</p>
					<button>
						<a
							href='https://t.me/+_F020xmmsFAxMWI1'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center gap-2 text-yellow-700 '
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
