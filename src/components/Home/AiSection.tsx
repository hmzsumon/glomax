import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const AiSection = () => {
	const { isAuthenticated } = useSelector((state: any) => state.auth);
	return (
		<div className=' px-8 py-10'>
			<div className=' md:grid grid-cols-2 gap-8'>
				<div className=' md:flex flex-col items-start justify-center'>
					<div className=' space-y-4'>
						<div>
							<h2 className=' text-left'>
								<span className='text-xl text-blue-gray-200 font-bold'>
									AI-Powered Trading Revolutionizing Financial Markets
								</span>
							</h2>
						</div>

						<div>
							<p className=' text-blue-gray-300'>
								We are a team of professional traders, AI developers and
								analysts with extensive experience in the crypto currency
								market. We have developed a unique trading strategy that has
								shown excellent results in the past few years. We are now ready
								to share our experience with you. We have created a unique
								platform where you can invest in our trading strategy and get a
								stable income.
							</p>
						</div>

						{isAuthenticated ? (
							<div>
								<Link href='/ai-robot'>
									<button className=' w-full md:w-6/12 bg-yellow-700 hover:bg-yellow-800 text-blue-gray-900 font-bold py-2 px-4 rounded'>
										Create Ai now
									</button>
								</Link>
							</div>
						) : (
							<div>
								<Link href='/register'>
									<button className=' w-full md:6/12 bg-yellow-700 hover:bg-yellow-800 text-blue-gray-900 font-bold py-2 px-4 rounded'>
										Crate an account
									</button>
								</Link>
							</div>
						)}
					</div>
				</div>
				<div className=' mt-8 md:mt-0'>
					<div className='flex justify-center gap-6'>
						<img
							src='/images/ai/AI_1.png'
							alt='Trade1'
							className='w-40 md:w-60'
						/>
						<img
							src='/images/ai/AI_2.png'
							alt='Trade2'
							className='w-40 md:w-60'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AiSection;
