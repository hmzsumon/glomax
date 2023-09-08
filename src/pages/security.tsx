import Layout from '@/Layout';
import DeviceAndActivity from '@/components/Security/DeviceAndActivities';
import Header from '@/components/Security/Header';
import SecurityNotice from '@/components/Security/SecurityNotice';
import TwoFactorAuth from '@/components/Security/TwoFactorAuth';
import UserLayout from '@/components/layout/UserLayout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';

const Security = () => {
	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-6 py-20 '>
					<div>
						<TwoFactorAuth />
					</div>
					{/* <div>
						<DeviceAndActivity />
					</div> */}
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Security;
