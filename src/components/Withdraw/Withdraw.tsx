import { formDate } from '@/utils/functions';
import React from 'react';
import { GoDotFill } from 'react-icons/go';
import { ClockLoader } from 'react-spinners';
interface Props {
	record: any;
}

const Withdraw = ({ record }: Props) => {
	return (
		<div className='px-4 py-1 list-none text-blue-gray-400 '>
			<div className='grid grid-cols-2'>
				<li>Amount</li>
				<li className='text-end'>
					{Number(record?.amount).toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</li>
			</div>
			{record?.method?.name === 'crypto' && (
				<>
					<div className='grid grid-cols-2'>
						<li>
							<p className='capitalize'>Method</p>
						</li>
						<li className='text-end'>{record?.method?.name}</li>
					</div>
					<div className='grid grid-cols-2'>
						<li>
							<p className='capitalize'>Network</p>
						</li>
						<li className='text-end'>{record?.method?.network}</li>
					</div>
					<div className='grid grid-cols-2'>
						<li>
							<p className='capitalize'>Address</p>
						</li>
						<li className='text-end'>{record?.method?.address}</li>
					</div>
				</>
			)}

			{record?.method?.name === 'binance' && (
				<>
					<div className='grid grid-cols-2'>
						<li>
							<p className='capitalize'>Method</p>
						</li>
						<li className='text-end'>{record?.method?.name}</li>
					</div>
					<div className='grid grid-cols-2'>
						<li>
							<p className='capitalize'>Pay ID</p>
						</li>
						<li className='text-end'>{record?.method?.pay_id}</li>
					</div>
				</>
			)}

			<div className='grid grid-cols-2'>
				<li>
					<p className='capitalize'>Transaction ID</p>
				</li>
				<li className='text-end'>{record?._id}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Status</li>
				<li className='text-end'>
					{record?.status === 'approved' && (
						<p className='capitalize  text-[#388E3C]'>Success</p>
					)}
					{record?.status === 'pending' && (
						<p className='capitalize  text-yellow-700 '>Processing</p>
					)}
				</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Date</li>
				<li className='text-end'>
					{new Date(record?.createdAt).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
					})}
				</li>
			</div>
		</div>
	);
};

export default Withdraw;
