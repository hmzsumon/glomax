import React from 'react';

const Trusted = () => {
	return (
		<div>
			<div className='px-8 py-16'>
				<div className=' space-y-3 my-10'>
					<h2 className='text-xl md:text-4xl font-bold'>
						Your trusted crypto exchange
					</h2>
					<p className=' '>
						Here at Binance, we are committed to user protection with strict
						protocols and industry-leading technical measures.
					</p>
				</div>

				<div className=' grid md:grid-cols-2 md:gap-x-20 gap-6 '>
					<div className=' space-y-4'>
						<div className=' flex items-center gap-x-10 '>
							<img src='./images/icons/icon5.png' alt='' className=' w-16' />
							<div className=' space-y-2'>
								<h1 className=' text-xl font-bold'>
									Secure Asset Fund for Users (SAFU)
								</h1>
								<p>
									Binance stores 10% of all trading fees in a secure asset fund
									to protect a share of user funds.
								</p>
							</div>
						</div>
						<div className=' flex items-center gap-x-10 '>
							<img src='./images/icons/icon6.png' alt='' className=' w-16' />
							<div className=' space-y-2'>
								<h1 className=' text-xl font-bold'>Advanced Data Encryption</h1>
								<p>
									Your transaction data is secured via end-to-end encryption,
									ensuring that only you have access to your personal
									information
								</p>
							</div>
						</div>
						<div className=' flex items-center gap-x-10 '>
							<img src='./images/icons/icon7.png' alt='' className=' w-16' />
							<div className=' space-y-2'>
								<h1 className=' text-xl font-bold'>
									Secure Asset Fund for Users (SAFU)
								</h1>
								<p>
									Binance stores 10% of all trading fees in a secure asset fund
									to protect a share of user funds.
								</p>
							</div>
						</div>
					</div>
					<div>
						<img src='./images/trast-ted.png' alt='' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Trusted;
