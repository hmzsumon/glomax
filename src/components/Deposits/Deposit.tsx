import { formDate } from '@/utils/functions';
import React from 'react';
import { GoDotFill } from 'react-icons/go';
import { ClockLoader } from 'react-spinners';
interface Props {
	record: any;
}

const Deposit = ({ record }: Props) => {
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
				</li>
			</div>
		</div>
	);
};

export default Deposit;
