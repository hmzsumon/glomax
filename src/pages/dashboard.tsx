import UserInfo from '@/components/Dashboard.tsx/UserInfo';
import UserLayout from '@/components/layout/UserLayout';
import { useLoadUserQuery } from '@/features/auth/authApi';
import { getCookie } from '@/utils/cookie';
import { HomeIcon } from '@/utils/icons/CommonIcons';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const dashboard = () => {
	const { user } = useSelector((state: any) => state.auth);
	// useLoadUserQuery();
	const router = useRouter();

	useEffect(() => {
		if (user?.is_block) {
			router.push('/block');
		}
	}, [user]);

	return (
		<UserLayout>
			<div>
				<UserInfo />
			</div>
		</UserLayout>
	);
};

export default dashboard;
