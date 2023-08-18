import React from 'react';

const Help = () => {
	return (
		<div>
			<div className='px-8 py-16'>
				<h1 className=' text-2xl md:text-4xl font-bold'>Need help?</h1>
				<div className=' grid md:grid-cols-3 gap-4 my-20'>
					<div className=' flex items-start space-x-4'>
						<img src='./images/icons/icon8.png' alt='' className='w-16' />
						<div className=' space-y-2'>
							<h1 className=' text-xl font-bold'>24/7 Chat Support</h1>
							<p>
								Get 24/7 chat support with our friendly customer service agents
								at your service
							</p>
							<button>
								<a
									href='https://t.me/johan028'
									target='_blank'
									rel='noopener noreferrer'
									className=' text-yellow-700'
								>
									Chat now
								</a>
							</button>
						</div>
					</div>
					<div className=' flex items-start space-x-4'>
						<img src='./images/icons/icon9.png' alt='' className='w-16' />
						<div className=' space-y-2'>
							<h1 className=' text-xl font-bold'>24/7 Chat Support</h1>
							<p>
								Get 24/7 chat support with our friendly customer service agents
								at your service
							</p>
							<button>
								<a
									href='https://t.me/johan028'
									target='_blank'
									rel='noopener noreferrer'
									className=' text-yellow-700'
								>
									Chat now
								</a>
							</button>
						</div>
					</div>
					<div className=' flex items-start space-x-4'>
						<img src='./images/icons/icon10.png' alt='' className='w-16' />
						<div className=' space-y-2'>
							<h1 className=' text-xl font-bold'>24/7 Chat Support</h1>
							<p>
								Get 24/7 chat support with our friendly customer service agents
								at your service
							</p>
							<button>
								<a
									href='https://t.me/johan028'
									target='_blank'
									rel='noopener noreferrer'
									className=' text-yellow-700'
								>
									Chat now
								</a>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Help;
