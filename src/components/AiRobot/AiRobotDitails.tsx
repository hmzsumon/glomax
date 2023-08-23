import React from 'react';
import { GoDotFill } from 'react-icons/go';
interface Props {
	record: any;
}

const AiRobotDetails = ({ record }: Props) => {
	return (
		<div className='px-2 py-1 text-xs list-none text-blue-gray-400 '>
			<div className='grid grid-cols-2'>
				<li>InvestMent</li>
				<li className='text-end'>
					{Number(record?.current_investment).toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</li>
			</div>
			{record?.status === 'cancelled' && (
				<div className='grid grid-cols-2'>
					<li>Cancelled Charge</li>
					<li className='text-end'>
						{Number(record?.cancel_charge).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</li>
				</div>
			)}
			{record?.status === 'cancelled' ? (
				<div className='grid grid-cols-2'>
					<li>Refund</li>
					<li className='text-end'>
						{Number(record?.refund_amount).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</li>
				</div>
			) : (
				<div className='grid grid-cols-2'>
					<li>Profit</li>
					<li className='text-end'>
						{Number(record?.profit).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</li>
				</div>
			)}
			{record?.status === 'completed' && (
				<div className='grid grid-cols-2'>
					<li>Ai Charge</li>
					<li className='text-end'>
						{Number(record?.trade_charge).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</li>
				</div>
			)}
			{record?.status === 'completed' && (
				<div className='grid grid-cols-2'>
					<li>Take Profit</li>
					<li className='text-end'>
						{Number(record?.take_profit).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</li>
				</div>
			)}

			<div className='grid grid-cols-2'>
				<li>Grid Number</li>
				<li className='text-end '>{record?.grid_no}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Profit %</li>
				<li className='text-end '>{record?.profit_percent}</li>
			</div>

			<div className='grid grid-cols-2 '>
				<li>Pair</li>
				<li className='text-end'>{record?.pair}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Status</li>
				<li className='text-end'>{record?.status}</li>
			</div>
			<div className='grid grid-cols-2 '>
				<li>Open time</li>
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
			<div className='grid grid-cols-2 '>
				<li>Close time</li>
				<li className='text-end'>
					{new Date(record?.close_time).toLocaleDateString('en-US', {
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

export default AiRobotDetails;
