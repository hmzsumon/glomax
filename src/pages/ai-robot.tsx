import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import { Button } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { MdLegendToggle } from 'react-icons/md';
import { HistoryIcon } from '@/global/icons/CommonIcons';
import { FcFaq } from 'react-icons/fc';
import AiTradeRecords from '@/components/AiRobot/AiTradeRecords';
import { PiChartLineDuotone } from 'react-icons/pi';
import { GiCheckMark } from 'react-icons/gi';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import BeforeCreate from '@/components/AiRobot/BeforeCreate';
import AfterCreate from '@/components/AiRobot/AfterCreate';

const AiRobot = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='pt-20 pb-24 px-2 ai-wrapper '>
					{/* <div className='ai-overlay'></div> */}
					<div className='relative px-4 py-6 mx-auto rounded-lg bg-black_2 md:w-7/12'>
						<div className=''>
							{/* start Heading */}
							<div className=' flex justify-between'>
								<div>
									<div className=''>
										<h1 className=' text-2xl font-bold text-blue-gray-200 '>
											AI Robot Trading
										</h1>
										<p className='text-gray-500  text-sm my-2 '>
											Deploy RapidWin automation tools to trade crypto like a
											pro.Identify and replicate trading strategies on the
											largest exchange with unparalleled liquidity.
										</p>
									</div>
									<div>
										<span className=' text-blue-gray-400'>
											Ai Balance:{' '}
											<span className='text-yellow-700'>
												{Number(user?.ai_balance).toLocaleString('en-US', {
													minimumFractionDigits: 2,
												})}{' '}
												USDT
											</span>
										</span>
									</div>
								</div>
								<div className='flex'>
									<FcFaq className='inline-block mr-1 text-xl text-white' />
								</div>
							</div>
							{/* End Heading */}
							<div className='text-blue-gray-200 my-4'>
								<div className='mt-2 grid grid-cols-2 border border-blue-gray-800 p-4  items-center justify-between'>
									<div>
										<p className='text-sm text-gray-500'>Active Strategies</p>
										<h2>66,420</h2>
									</div>
									<div>
										<p className='text-sm text-gray-500'>Total Value</p>
										<h2>105.514,187.34</h2>
									</div>
								</div>

								<div className=' grid grid-cols-2 my-4 gap-2'>
									<Link href='/convert'>
										<Button color='amber' className=' w-full'>
											Convert
										</Button>
									</Link>
									<Link href='/ai-history'>
										<Button color='amber' className=' w-full'>
											History
										</Button>
									</Link>
								</div>
								<div>{user?.ai_robot ? <AfterCreate /> : <BeforeCreate />}</div>
							</div>
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default AiRobot;
