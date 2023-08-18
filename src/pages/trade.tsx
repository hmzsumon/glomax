import Layout from '@/Layout';
import TradeHome from '@/components/Trade';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';

const Trade = () => {
	return (
		<Layout>
			<ProtectedRoute>
				<div className='pt-14 md:pt-[4.5rem] pb-[4.5rem] md:pb-[5rem]'>
					<div className='mx-auto md:w-6/12'>
						<TradeHome />
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Trade;
