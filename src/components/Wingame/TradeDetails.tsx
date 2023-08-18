import React from 'react';
import { GoDotFill } from 'react-icons/go';
interface Props {
	record: any;
}

const TradeDetails = ({ record }: Props) => {
	return (
		<div className='px-4 py-1 list-none text-blue-gray-400 '>
			<div className='grid grid-cols-2'>
				<li>Period</li>
				<li className='text-end'>{record?.period}</li>
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

			{record?.status === 'win' && (
				<div className='grid grid-cols-2'>
					<li>Win Amount</li>
					<li className='text-end text-[#388E3C]'>
						+{Number(record?.win_amount).toFixed(2)}
					</li>
				</div>
			)}

			{record?.status === 'lose' && (
				<div className='grid grid-cols-2'>
					<li>Lose Amount</li>
					<li className='text-end text-[#D32F2F]'>
						-{Number(record?.trade_amount).toFixed(2)}
					</li>
				</div>
			)}

			{record?.result?.length > 0 && (
				<div className='grid grid-cols-2 '>
					<li>Result</li>
					{record?.result.length === 2 && (
						<li className='flex items-center justify-end text-end'>
							<span
								className={`${
									record?.result[0] === 'green'
										? 'text-green-500'
										: record?.result[0] === 'red'
										? 'text-red-500'
										: 'text-[#6739b6]'
								} `}
							>
								{record?.result[1]}
							</span>
							<span className='-mr-2'>
								<GoDotFill
									className={`${
										record?.result[0] === 'green'
											? 'text-green-500'
											: record?.result[0] === 'red'
											? 'text-red-500'
											: 'text-[#6739b6]'
									} text-3xl `}
								/>
							</span>
						</li>
					)}

					{record?.result.length === 3 && (
						<li className='flex items-center justify-end text-end'>
							<span
								className={`${
									record?.result[0] === 'green'
										? 'text-green-500'
										: record?.result[0] === 'red'
										? 'text-red-500'
										: 'text-[#6739b6]'
								} `}
							>
								{record?.result[2]}
							</span>
							<span className='-mr-2'>
								<GoDotFill
									className={`${
										record?.result[0] === 'green'
											? 'text-green-500'
											: record?.result[0] === 'red'
											? 'text-red-500'
											: 'text-[#6739b6]'
									} text-3xl `}
								/>
							</span>
							<span className='-mr-2'>
								<GoDotFill
									className={`${
										record?.result[1] === 'green'
											? 'text-green-500'
											: record?.result[1] === 'red'
											? 'text-red-500'
											: 'text-[#6739b6]'
									} text-3xl `}
								/>
							</span>
						</li>
					)}
				</div>
			)}

			<div className='grid grid-cols-2 '>
				<li>Select</li>
				<li className='text-end'>{record?.trade_number}</li>
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
