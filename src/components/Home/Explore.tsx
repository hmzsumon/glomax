import React from 'react';

const Explore = () => {
	return (
		<div className=' px-8 py-16'>
			<h2 className='text-xl md:text-4xl font-bold'>
				Explore endless possibilities with Binance
			</h2>
			<div className=' grid md:grid-cols-3 my-8 gap-4'>
				<div className=' space-y-16'>
					<div className=' '>
						<img
							src='./images/explore/img1.png'
							alt=''
							className='w-60 mx-auto rounded-2xl'
						/>
					</div>
					<div className=' space-y-3'>
						<h2 className=' md:text-3xl font-bold'>Dive into world of NFTs</h2>
						<p>
							Open rare Mystery Boxes, explore IGOs, Fan Tokens, and more with
							Binance NFT.
						</p>
					</div>
				</div>

				<div className=' space-y-16'>
					<div className=' space-y-3'>
						<h2 className=' md:text-3xl font-bold'>Dive into world of NFTs</h2>
						<p>
							Open rare Mystery Boxes, explore IGOs, Fan Tokens, and more with
							Binance NFT.
						</p>
					</div>
					<div className=' '>
						<img
							src='./images/explore/img2.png'
							alt=''
							className='w-60 mx-auto rounded-2xl'
						/>
					</div>
				</div>

				<div className=' space-y-16'>
					<div className=' '>
						<img
							src='./images/explore/img3.png'
							alt=''
							className='w-60 mx-auto rounded-2xl'
						/>
					</div>
					<div className=' space-y-3'>
						<h2 className=' md:text-3xl font-bold'>Dive into world of NFTs</h2>
						<p>
							Open rare Mystery Boxes, explore IGOs, Fan Tokens, and more with
							Binance NFT.
						</p>
					</div>
				</div>
			</div>
			<div>
				<button className='flex items-center justify-center w-full md:w-1/3 gap-1 py-2 font-semibold text-gray-900 bg-yellow-700 rounded '>
					Get started
				</button>
			</div>
		</div>
	);
};

export default Explore;
