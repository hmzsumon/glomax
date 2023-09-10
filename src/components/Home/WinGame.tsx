import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const WinGame = () => {
	const { isAuthenticated } = useSelector((state: any) => state.auth);
	return (
		<div className='px-8 py-10 '>
			<div>
				<div className='flex flex-col items-center justify-center '>
					<div className='text-blue-gray-200'>
						<h2 className='text-3xl font-bold text-center text-blue-gray-100 '>
							Win Game
						</h2>
						<h2 className='text-2xl text-center '>
							Just play and earn from it
						</h2>
						<p className='mx-auto my-2 md:w-6/12 text-blue-gray-300'>
							Play win game and earn money. You can join our telegram
							group/channel and follow our prediction to win a game. We will
							arrange official game 3 times/day.
						</p>
					</div>
					<div className='w-full my-6 '>
						<div className='mx-auto text-center md:w-6/12 '>
							{isAuthenticated ? (
								<div>
									<Link href='/wingame'>
										<button className='w-full px-4 py-2 font-bold bg-yellow-700 rounded md:w-4/12 hover:bg-yellow-800 text-blue-gray-900'>
											Play now
										</button>
									</Link>
								</div>
							) : (
								<div>
									<Link href='/register'>
										<button className='w-full px-4 py-2 font-bold bg-yellow-700 rounded md:4/12 hover:bg-yellow-800 text-blue-gray-900'>
											Crate an account
										</button>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='grid grid-cols-3 gap-6 md:gap-10'>
					<img src='/images/win/win_1.png' alt='wingame' className='w-full' />
					<img src='/images/win/win_2.png' alt='wingame' className='w-full' />
					<img src='/images/win/win_3.png' alt='wingame' className='w-full' />
				</div>
			</div>
		</div>
	);
};

export default WinGame;
