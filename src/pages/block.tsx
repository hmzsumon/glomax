import React, { useEffect } from 'react';
import Image from 'next/image';
import { useLogoutUserMutation } from '@/features/auth/authApi';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const Block = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [logoutUser, { isLoading, isError }] = useLogoutUserMutation();

	useEffect(() => {
		logoutUser({ email: user?.email });
		console.log('logout');

		// Remove token and user info from cookies
		Cookies.remove('token');
		Cookies.remove('user');
	}, []);

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
