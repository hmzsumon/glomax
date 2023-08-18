import { useRouter } from 'next/router';
import React from 'react';

const data = [
	{
		id: 1,
		title: 'Verify your identity',
		dec: 'Complete the identity verification process to secure your account and transactions.',
		img: './images/icons/icon1.png',
	},
	{
		id: 2,
		title: 'Invite friends to earn more',
		dec: 'Invite your friends to join WFC and earn more WFC by using your referral link.',
		img: './images/icons/icon2.png',
	},
	{
		id: 3,
		title: 'Start Free Mining',
		dec: 'Start mining with your free 1000 WFC and earn more WFC by inviting your friends.',
		img: './images/icons/icon3.png',
	},
];
const referId = process.env.NEXT_PUBLIC_DEFAULT_REFER_ID;
const CryptoProfile = () => {
	const router = useRouter();
	return (
		<div className='grid px-8 my-10 md:grid-cols-2 '>
			<div className=''>
				<div className='space-y-3 '>
					<h1 className='text-xl font-bold md:text-4xl '>
						Build your wfc portfolio
					</h1>
					<p className='text-xs font-semibold text-gray-400 md:text-xl '>
						Start your first free mining with these easy steps.
					</p>
				</div>
				<div>
					{data.map((item) => (
						<div
							key={item.id}
							className='flex items-center my-4 space-x-4 space-y-6'
						>
							<img src={item.img} alt='' className='w-11 ' />
							<div>
								<h1 className='text-xl font-semibold'>{item.title}</h1>
								<p className='text-sm font-medium text-gray-500'>{item.dec}</p>
							</div>
						</div>
					))}
				</div>
				<div className='mx-auto my-6 md:w-7/12 '>
					<button
						className='flex items-center justify-center w-full gap-1 py-2 font-semibold text-gray-900 bg-yellow-700 rounded '
						onClick={() =>
							router.push({
								pathname: '/register',
								query: { referral_id: referId },
							})
						}
					>
						Get started
					</button>
				</div>
			</div>
			<div className='flex items-center justify-center '>
				<img
					src='./images/icons/icon4.png'
					alt=''
					className='w-64 rounded-2xl'
				/>
			</div>
		</div>
	);
};

export default CryptoProfile;
