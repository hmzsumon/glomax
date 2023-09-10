import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const TradeSection = () => {
	const { isAuthenticated } = useSelector((state: any) => state.auth);
	return (
		<div className='px-8 pb-10 '>
			<div className='flex flex-col items-center gap-8 md:flex-row justify-evenly'>
				<div className='order-2 md:order-1'>
					<div className='flex justify-center gap-6'>
						<img
							src='/images/trade/Trade_1.png'
							alt='Trade1'
							className='w-40 md:w-60'
						/>
						<img
							src='/images/trade/Trade_2.png'
							alt='Trade2'
							className='w-40 md:w-60'
						/>
					</div>
				</div>
				<div className='flex-col items-center justify-center order-1 mt-10 md:order-2 md:mt-0 md:flex'>
					<div className='space-y-4 '>
						<div>
							<h2 className='text-left '>
								<span className='text-3xl font-bold text-blue-gray-100'>
									Trade
								</span>
							</h2>
						</div>

						<div className=' text-blue-gray-200'>
							<h2>
								<span className='text-2xl font-bold'>Higher leverage,</span>{' '}
								<br />
								<span className='text-2xl font-bold'>lower margin</span>
							</h2>
						</div>
						<div>
							<p className=' text-blue-gray-200'>
								A safe and secure way to trade cryptocurrencies.
							</p>
						</div>

						{isAuthenticated ? (
							<div>
								<Link href='/trade'>
									<button className='w-full px-4 py-2 font-bold bg-yellow-700 rounded md:6/12 hover:bg-yellow-800 text-blue-gray-900'>
										Trade Now
									</button>
								</Link>
							</div>
						) : (
							<div>
								<Link href='/register'>
									<button className='w-full px-4 py-2 font-bold bg-yellow-700 rounded md:6/12 hover:bg-yellow-800 text-blue-gray-900'>
										Crate an account
									</button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TradeSection;
