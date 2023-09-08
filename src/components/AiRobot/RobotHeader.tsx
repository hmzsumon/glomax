import { HistoryIcon } from '@/global/icons/CommonIcons';
import { useRouter } from 'next/router';
import React from 'react';
import { BiTransferAlt } from 'react-icons/bi';
import { HiArrowSmLeft } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

const RobotHeader = ({ ticker, setOpen, open }: any) => {
	const router = useRouter();
	const { symbol } = useSelector((state: any) => state.trade);

	return (
		<div>
			<div className='py-2 bg-black_2'>
				<div className='flex items-center justify-between px-4 mb-4 '>
					<div>
						<HiArrowSmLeft
							className='text-2xl cursor-pointer text-blue-gray-300 hover:text-blue-700'
							onClick={() => router.back()}
						/>
					</div>
					<div className=''>
						<h2 className='text-center '>Ai Spot Grid</h2>
					</div>
					<div>
						<HistoryIcon h={6} w={6} color={'gray'} />
					</div>
				</div>
				<div className='flex items-center justify-between px-4 '>
					<div className='flex items-end space-x-2 '>
						<div className='flex items-center justify-center gap-2'>
							<BiTransferAlt
								className='text-2xl text-yellow-700 cursor-pointer '
								onClick={() => setOpen(!open)}
							/>
							<h2 className='text-xl text-blue-gray-100'>{symbol}</h2>
						</div>
						<div>
							{ticker?.c ? (
								<div className='space-y-1 '>
									<h2
										className={`${
											Number(ticker?.c) > Number(ticker?.b)
												? 'text-green-500'
												: Number(ticker?.c) < Number(ticker?.b)
												? 'text-deep-orange-500'
												: 'text-blue-gray-100'
										}`}
									>
										<span>
											{ticker?.c?.length === 10
												? Number(ticker?.c).toLocaleString('en-US', {
														minimumFractionDigits: 6,
												  })
												: Number(ticker?.c).toLocaleString('en-US', {
														minimumFractionDigits: 2,
												  })}
										</span>
										<span
											className={` text-xs ml-1 ${
												Number(ticker?.P) > 0
													? 'text-green-500'
													: 'text-deep-orange-500'
											}`}
										>
											{Number(ticker?.P).toLocaleString('en-US', {
												minimumFractionDigits: 2,
											})}
											%
										</span>
									</h2>
									<h2 className={`text-sm space-x-2`}></h2>
								</div>
							) : (
								<div className='flex items-center justify-center mt-3 '>
									<BeatLoader size={5} color={'#fff'} />
								</div>
							)}
						</div>
					</div>
					{/* <div className='flex flex-col items-center gap-1 text-xs md:flex-row md:gap-6 '>
						<div className='space-y-1 md:space-y-2 '>
							<p className=' text-blue-gray-300'>24h High</p>
							{ticker?.h ? (
								<p className=' text-blue-gray-100'>
									{Number(ticker?.h).toLocaleString('en-US')}
								</p>
							) : (
								<div className='flex items-center justify-center mt-3 '>
									<BeatLoader size={5} color={'#fff'} />
								</div>
							)}
						</div>
						<div className='space-y-1 md:space-y-2'>
							<p className=' text-blue-gray-300'>24h Low</p>
							{ticker?.l ? (
								<p className=' text-blue-gray-100'>
									{Number(ticker?.l).toLocaleString('en-US')}
								</p>
							) : (
								<div className='flex items-center justify-center mt-3 '>
									<BeatLoader size={5} color={'#fff'} />
								</div>
							)}
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default RobotHeader;
