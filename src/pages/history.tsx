import UserInfo from '@/components/Dashboard.tsx/UserInfo';
import AllHistory from '@/components/History/AllHistory';

import UserLayout from '@/components/layout/UserLayout';
import { useLoadUserQuery } from '@/features/auth/authApi';
import { getCookie } from '@/utils/cookie';
import { HomeIcon } from '@/utils/icons/CommonIcons';
import React from 'react';
import { useSelector } from 'react-redux';

const History = () => {
	const { user } = useSelector((state: any) => state.auth);
	useLoadUserQuery(user?._id);
	return (
		<UserLayout>
			<div>
				<div className='px-4 md:py-8'>
					<AllHistory />
				</div>
			</div>
		</UserLayout>
	);
};

export default History;
