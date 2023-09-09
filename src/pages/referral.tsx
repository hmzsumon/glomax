import UserHeader from '@/components/layout/UserHeader/UserHeader';
import React from 'react';
import { RiFileCopyFill } from 'react-icons/ri';
import { FaQrcode } from 'react-icons/fa';
import Image from 'next/image';
import MyReferrals from '@/components/Referrals/MyReferrals';
import MyTask from '@/components/Referrals/MyTask';
import { useSelector } from 'react-redux';
import CopyToClipboard from '@/utils/CopyToClipboard';
import { RightArrowIcon } from '@/utils/icons/CommonIcons';
import { BiChevronRight } from 'react-icons/bi';
import Link from 'next/link';
import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import { RWebShare } from 'react-web-share';
const Referral = () => {
	const { user } = useSelector((state: any) => state.auth);

	// get host
	const host = window.location.host;
	// create referral link wit user customer_id
	let referralLink = '';
	if (process.env.NODE_ENV === 'development') {
		referralLink = `http://${host}/register?referral_id=${user?.customer_id}`;
	} else {
		referralLink = `https://${host}/register?referral_id=${user?.customer_id}`;
	}
	// short referral link
	const shortReferralLink = referralLink.slice(0, 15) + '...';
	return (
		<Layout>
			<ProtectedRoute>
				<div className='py-20 referral-wrapper'>
					<div className='overlay'></div>
					<div className='content '>
						<div className='px-4 mx-auto md:w-7/12 '>
							<div className='grid items-center gap-6 py-2 '>
								<div className='w-full p-8 bg-black_2 rounded-xl'>
									<h2 className='mb-6 text-xl font-bold '>Default Referral</h2>
									<div className='space-y-10 '>
										<div className='flex items-center justify-between p-4 bg-[#12161C] rounded-xl '>
											<p>Invite ID</p>
											<div className='flex items-center space-x-4 '>
												<p>{user?.customer_id}</p>
												<CopyToClipboard text={user?.customer_id} />
											</div>
										</div>

										<div className='flex items-center justify-between p-4 bg-[#12161C] rounded-xl '>
											<p>Invite Link</p>
											<div className='flex items-center space-x-4 '>
												<p>{shortReferralLink}</p>
												<CopyToClipboard text={referralLink} />
											</div>
										</div>

										<div className='flex items-center grid-cols-8 gap-4 '>
											<RWebShare data={{ url: referralLink }}>
												<div className='relative flex-1 col-span-7 p-4 bg-yellow-600 cursor-pointer rounded-xl'>
													<div className='absolute hidden md:block bottom-1'>
														<Image
															src='/images/referrals/icon.png'
															width={120}
															height={50}
															alt='coin'
														/>
													</div>
													<div>
														<h2 className='text-2xl font-bold text-center text-gray-800 '>
															Invite Friend{' '}
														</h2>
													</div>
												</div>
											</RWebShare>
											<div className='flex items-center justify-center col-span-1 p-4 bg-[#474D57] rounded-xl'>
												<FaQrcode className='inline-block text-2xl text-gray-400 cursor-pointer ' />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='px-4 space-y-6 '>
							<div>
								<MyReferrals />
								{/* <MyTask /> */}
							</div>
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Referral;
