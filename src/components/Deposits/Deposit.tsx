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
				<li>
					<p className='capitalize'>Order ID</p>
				</li>
				<li className='text-end'>{record?._id}</li>
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
				<li>Amount</li>
				<li className='text-end'>
					{Number(record?.amount).toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>
					<p className='capitalize'>Transaction ID</p>
				</li>
				<li className='text-end'>{record?.transactionId}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Status</li>
				<li className='text-end'>
					{record?.status === 'approved' && (
						<p className='capitalize  text-[#388E3C]'>{record?.status}</p>
					)}
					{record?.status === 'rejected' && (
						<p className='capitalize  text-[#D32F2F]'>{record?.status}</p>
					)}

					{record?.status === 'pending' && (
						<p className='text-orange-500 capitalize'>{record?.status}</p>
					)}
				</li>
			</div>
			{record?.status === 'approved' && (
				<div className='grid grid-cols-2 '>
					<li>Approved At</li>
					<li className='text-end'>
						{new Date(record?.updatedAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
						})}
					</li>
				</div>
			)}
			{record?.status === 'rejected' && (
				<div className='grid grid-cols-2 '>
					<li>Approved At</li>
					<li className='text-end'>
						{new Date(record?.updatedAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
						})}
					</li>
				</div>
			)}
			{record?.status === 'rejected' && (
				<div className='grid grid-cols-2 '>
					<li>
						<p className='capitalize'>Reason</p>
					</li>
					<li className='text-end'>
						<p className='capitalize'>{record?.reason}</p>
					</li>
				</div>
			)}
		</div>
	);
};

export default Deposit;
