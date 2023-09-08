import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';

const RemoveAccount = () => {
	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-4 py-20'>
					<div className='px-4 py-8 mx-auto mt-20 md:w-6/12 bg-black_2'>
						<h1 className='text-xl font-bold text-center text-blue-gray-200'>
							Remove Account
						</h1>
						<p className='text-center text-blue-gray-200 '>
							If you want to remove your account, please contact us.
						</p>
						<div>
							<a
								href='https://wa.me/qr/6N3R6JMPOWFYI1'
								target='_blank'
								className='block px-4 py-2 mt-4 text-sm font-bold text-center bg-yellow-700 rounded text-blue-gray-800 hover:bg-yellow-800'
							>
								Contact Us
							</a>
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default RemoveAccount;
