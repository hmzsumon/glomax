import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import CopyToClipboard from '@/global/CopyToClipboard';
import Avatar from '@/components/Profile/Avatar';

import { useLoadUserQuery } from '@/features/auth/authApi';

const Profile = () => {
	const { user } = useSelector((state: any) => state.auth);
	useLoadUserQuery(user?._id);
	return (
		<Layout>
			<ProtectedRoute>
				<div className=' min-h-[100vh] signup-wrapper'>
					<div className='px-4 py-20'>
						<div className='p-4 md:w-7/12 rounded-md bg-black_2 opacity-[0.95] mx-auto'>
							<div className=''>
								<Avatar />
								<div className='mx-auto my-6 md:w-6/12 '>
									<div className='space-y-2 list-none '>
										<div className='flex gap-2 '>
											<li>Your Rank</li>
											<li>:</li>
											<li className='capitalize '>{user?.rank}</li>
										</div>

										<div className='flex gap-2 '>
											<li>Username</li>
											<li>:</li>
											<li>{user?.username}</li>
										</div>

										<div className='flex gap-2 '>
											<li>User ID</li>
											<li>:</li>
											<li>{user?.customer_id}</li>
											<li>
												<CopyToClipboard text={user?.customer_id} />
											</li>
										</div>
										<div className='flex gap-2 '>
											<li>Email</li>
											<li>:</li>
											<li>{user?.email}</li>
										</div>
										<div className='flex gap-2 '>
											<li>Phone</li>
											<li>:</li>
											<li>{user?.phone}</li>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Profile;
