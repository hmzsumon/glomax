import React from 'react';
import {
	Drawer,
	Button,
	Typography,
	IconButton,
} from '@material-tailwind/react';
import Ticker from './Ticker';
const Market = ({ open, setOpen, tickers }: any) => {
	const openDrawer = () => setOpen(true);
	const closeDrawer = () => setOpen(false);
	return (
		<React.Fragment>
			<Drawer
				open={open}
				onClose={closeDrawer}
				className='p-4 overflow-y-auto bg-black_2'
			>
				<div className='flex items-center justify-between mb-6'>
					<Typography variant='h5' className=' text-blue-gray-200'>
						Market Overview
					</Typography>
					<IconButton variant='text' color='blue-gray' onClick={closeDrawer}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='w-5 h-5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</IconButton>
				</div>
				<div className=''>
					{tickers?.map((symbol: any) => {
						return (
							<div key={symbol?._id}>
								<Ticker coin={symbol} closeDrawer={closeDrawer} />{' '}
							</div>
						);
					})}
				</div>
			</Drawer>
		</React.Fragment>
	);
};

export default Market;
