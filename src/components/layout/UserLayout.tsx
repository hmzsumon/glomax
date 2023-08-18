import React, { use, useEffect } from 'react';
import UserHeader from './UserHeader/UserHeader';
import UserSide from './UserSide/UserSide';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useSelector((state: any) => state.auth);
	// check if user is authenticated
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/login');
		}
	}, [isAuthenticated]);

	return (
		<div>
			<UserHeader />
			<div className='flex min-h-screen '>
				<UserSide />
				<div className='flex-1 '>{children}</div>
			</div>
		</div>
	);
};

export default UserLayout;
