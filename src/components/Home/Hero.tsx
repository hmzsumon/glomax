import React from 'react';
import { AiFillGift } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { useRouter } from 'next/router';

const data = [
	{
		id: 1,
		title: '$38 billion',
		subtitle: '24h trading volume on Binance exchange',
	},
	{
		id: 2,
		title: '350+',
		subtitle: 'Cryptocurrencies listed',
	},
	{
		id: 3,
		title: '120 million',
		subtitle: 'Registered users',
	},

	{
		id: 4,
		title: '<0.10%',
		subtitle: 'Lowest transaction fees',
	},
];
const referId = process.env.NEXT_PUBLIC_DEFAULT_REFER_ID;
const Hero = () => {
	const router = useRouter();
	return (
		<div className='px-10 pt-10 pb-6'>
			<div className='grid md:grid-cols-2'>
				<div>
					<h1 className='font-semibold text-center md:text-left md:text-2xl '>
						<span className=' md:text-2xl'>
							Trade crypto currency fast and win infinite.
						</span>
						<br />
						<span className='text-gray-300 '>Never miss the Profit.</span>
					</h1>
					<div className='my-8 space-y-6 '>
						<div className='flex items-center space-x-2'>
							<AiFillGift className='text-2xl text-yellow-700' />
							<div className='flex items-center space-x-'>
								<p className='text-xl'>Join and Get 2 (USDT)</p>
								<MdKeyboardArrowRight className='text-xl font-semibold text-gray-500' />
							</div>
						</div>
						<div className=' space-y-4 md:w-[70%]'>
							<button
								className='flex items-center justify-center w-full gap-1 py-2 font-semibold text-gray-900 bg-yellow-700 rounded'
								onClick={() =>
									router.push({
										pathname: '/register',
										query: { referral_id: referId },
									})
								}
							>
								<BiUser className='text-2xl ' />
								Sign up with Email or Phone
							</button>
							<div className='grid items-center grid-cols-12'>
								<div className=' col-span-3 h-[1px] bg-gray-400 '></div>
								<div className='col-span-6 text-center '>or continue with</div>
								<div className='col-span-3 h-[1px] bg-gray-400 '></div>
							</div>
							<div className='flex items-center gap-2'>
								<button
									className='flex items-center justify-center w-full gap-1 py-2 font-semibold text-gray-900 bg-gray-600 rounded '
									onClick={() =>
										router.push({
											pathname: '/register',
											query: { referral_id: referId },
										})
									}
								>
									<FcGoogle className='text-xl ' />
									<span className='text-white '>Google</span>
								</button>
								<button
									className='flex items-center justify-center w-full gap-1 py-2 font-semibold text-gray-900 bg-gray-600 rounded '
									onClick={() =>
										router.push({
											pathname: '/register',
											query: { referral_id: referId },
										})
									}
								>
									<BsFacebook className='text-xl text-blue-500 ' />
									<span className='text-white '>Facebook</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className='items-center justify-center hidden w-full grid-cols-2 gap-2 md:flex'>
					<img src='./rapid-logo1.png' alt='' className='w-[25rem]' />
				</div>
			</div>
		</div>
	);
};

export default Hero;
