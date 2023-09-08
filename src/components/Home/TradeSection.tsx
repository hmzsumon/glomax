import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const TradeSection = () => {
	const { isAuthenticated } = useSelector((state: any) => state.auth);
	return (
		<div className=' px-8 py-10'>
			<div className=' flex flex-col md:flex-row items-center justify-evenly gap-8'>
				<div className=' order-2 md:order-1'>
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
				<div className='  order-1 md:order-2 mt-10 md:mt-0 md:flex flex-col items-center justify-center'>
					<div className=' space-y-4'>
						<div>
							<h2 className=' text-left'>
								<span className='text-3xl font-bold'>Trade</span>
							</h2>
						</div>

						<div>
							<h2>
								<span className='text-3xl font-bold'>Higher leverage,</span>{' '}
								<br />
								<span className='text-3xl font-bold'>lower margin</span>
							</h2>
						</div>
						<div>
							<p>A safe and secure way to trade cryptocurrencies.</p>
						</div>

						{isAuthenticated ? (
							<div>
								<Link href='/trade'>
									<button className=' w-full md:6/12 bg-yellow-700 hover:bg-yellow-800 text-blue-gray-900 font-bold py-2 px-4 rounded'>
										Trade Now
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
			</div>
		</div>
	);
};

export default TradeSection;
