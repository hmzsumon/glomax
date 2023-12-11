import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';

const CompleteKyc = () => {
	return (
		<Layout>
			<ProtectedRoute>
				<h1>Complete KYC</h1>
			</ProtectedRoute>
		</Layout>
	);
};

export default CompleteKyc;
