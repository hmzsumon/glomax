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

const AiRobot = () => {
	const { user } = useSelector((state: any) => state.auth);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='py-40 px-2 ai-wrapper '>
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
												{user?.ai_balance} USDT
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

								<div className=' grid grid-cols-3 my-4 gap-2'>
									<Button color='amber' className=' w-full'>
										Setting
									</Button>
									<Button color='amber' className=' w-full'>
										Convert
									</Button>
									<Button color='amber' className=' w-full'>
										History
									</Button>
								</div>
								<div>
									<section className=' flex flex-col justify-center  mx-auto'>
										<div className='  my-5 p-5 space-y-3 rounded-md border border-yellow-700 '>
											<div className=' items-center flex gap-x-2'>
												<PiChartLineDuotone className=' text-2xl' />
												<h4 className='text-blue-gray-200 text-xl font-semibold'>
													Ai Spot Grid
												</h4>
											</div>

											<p className='text-gray-500 text-sm'>
												Buy low and sell high 24/7 automatically with just one
												click.
											</p>

											<div className='flex gap-x-2'>
												<GiCheckMark className='text-green-500' />
												<h4 className='text-gray-500 font-body'>
													Volatile Markets
												</h4>
											</div>

											<div className='flex gap-x-2'>
												<GiCheckMark className='text-green-500' />
												<h4 className='text-gray-500 font-body'>
													Preset Ranges
												</h4>
											</div>

											<div className='flex justify-between items-center'>
												<Link
													href='create-robot'
													className='flex items-center gap-x-2 border cursor-pointer transition-all duration-200 hover:scale-110 p-2 rounded-md'
												>
													<p className='text-yellow-900'>Create</p>
													<BsArrowRight className='text-yellow-900' />
												</Link>
											</div>
										</div>
									</section>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default AiRobot;
