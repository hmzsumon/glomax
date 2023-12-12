import { maskEmail } from '@/utils/functions';
import { IconButton, Typography } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CopyToClipboard from '@/global/CopyToClipboard';

type UserInfoProps = {
	closeDrawerRight: () => void;
};

const UserInfo = ({ closeDrawerRight }: UserInfoProps) => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<div>
			<div className='absolute right-0'>
				<IconButton variant='text' color='red' onClick={closeDrawerRight}>
					<XMarkIcon strokeWidth={2} className='w-5 h-5' />
				</IconButton>
			</div>
			<div>
				<div className='flex items-center justify-center mt-3 '>
					<img
						src={user?.avatar?.url ? user?.avatar?.url : '/profile.png'}
						alt='user avatar'
						className='p-1 rounded-full ring-2 w-9 h-9 ring-blue-500'
					/>
				</div>
			</div>
			<div className='flex items-center justify-between px-4 pt-4 mb-6'>
				<div>
					<Typography variant='small' className='text-blue-gray-400'>
						{maskEmail(user?.email ? user?.email : 'example@gmail.com')}
					</Typography>
					<Typography variant='small' className='text-blue-gray-400'>
						Your Rank: {user?.rank}
					</Typography>
					<Typography variant='small' className='text-blue-gray-400'>
						Username: {user?.username}
					</Typography>
					<div className='flex items-center'>
						<Typography variant='small' className='text-blue-gray-400'>
							User ID: {user?.customer_id}
						</Typography>
						<CopyToClipboard text={user?.customer_id} />
					</div>
					{user?.promo_code && (
						<div className='flex items-center'>
							<Typography variant='small' className='text-blue-gray-400'>
								Promo Code: {user?.promo_code}
							</Typography>
							<CopyToClipboard text={user?.promo_code} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
