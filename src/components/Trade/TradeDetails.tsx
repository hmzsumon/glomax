import React from 'react';
import { GoDotFill } from 'react-icons/go';
interface Props {
	record: any;
}

const TradeDetails = ({ record }: Props) => {
	return (
		<div className='px-4 py-1 list-none text-blue-gray-400 '>
			<div className='grid grid-cols-2'>
				<li>Symbol</li>
				<li className='text-end'>{record?.symbol}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Open Price</li>
				<li className='text-end'>{record?.open_price}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Close Price</li>
				<li className='text-end'>{record?.close_price}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Amount</li>
				<li className='text-end'>{record?.amount}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Fee</li>
				<li className='text-end'>{Number(record?.trade_charge).toFixed(3)}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Trade Amount</li>
				<li className='text-end'>{record?.trade_amount}</li>
			</div>

			{record?.result === 'win' && (
				<div className='grid grid-cols-2'>
					<li>Win Amount</li>
					<li className='text-end text-[#388E3C]'>
						+{Number(record?.profit).toFixed(2)}
					</li>
				</div>
			)}

			{record?.result === 'loss' && (
				<div className='grid grid-cols-2'>
					<li>Lose Amount</li>
					<li className='text-end text-[#D32F2F]'>
						-{Number(record?.trade_amount).toFixed(2)}
					</li>
				</div>
			)}

			<div className='grid grid-cols-2 '>
				<li>Select</li>
				<li className='text-end'>{record?.trade_type}</li>
			</div>
			<div className='grid grid-cols-2'>
				<li>Status</li>
				<li className='text-end'>{record?.status}</li>
			</div>
			<div className='grid grid-cols-2 '>
				<li>Created At</li>
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

export default TradeDetails;
