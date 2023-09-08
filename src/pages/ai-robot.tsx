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
import { Dialog, DialogBody } from '@material-tailwind/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import AiFAQ from '@/components/AiRobot/AiFAQ';
const AiRobot = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [open3, setOpen3] = React.useState(false);
	const handleOpen3 = () => setOpen3(!open3);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-2 pt-20 pb-24 overflow-y-auto ai-wrapper '>
					{/* <div className='ai-overlay'></div> */}
					<div className='relative px-4 py-6 mx-auto rounded-lg bg-black_2 md:w-7/12'>
						<div className=''>
							{/* start Heading */}
							<div className='flex justify-between '>
								<div>
									<div className=''>
										<h1 className='text-2xl font-bold text-blue-gray-200'>
											AI Robot Trading
										</h1>
										<p className='my-2 text-sm text-gray-500 '>
											Deploy Glomax automation tools to trade crypto like a
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
									<FcFaq
										className='inline-block mr-1 text-xl text-white cursor-pointer '
										onClick={handleOpen3}
									/>
								</div>
							</div>
							{/* End Heading */}
							<div className='my-4 text-blue-gray-200'>
								<div className='grid items-center justify-between grid-cols-2 p-4 mt-2 border border-blue-gray-800'>
									<div>
										<p className='text-sm text-gray-500'>Active Strategies</p>
										<h2>66,420</h2>
									</div>
									<div>
										<p className='text-sm text-gray-500'>Total Value</p>
										<h2>105.514,187.34</h2>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-2 my-4 '>
									<Link href='/convert'>
										<Button color='amber' className='w-full '>
											Convert
										</Button>
									</Link>
									<Link href='/ai-history'>
										<Button color='amber' className='w-full '>
											History
										</Button>
									</Link>
								</div>
								<div>{user?.ai_robot ? <AfterCreate /> : <BeforeCreate />}</div>
							</div>
						</div>
					</div>
				</div>
				{/* For FAQ */}
				<>
					<Dialog
						size='md'
						open={open3}
						handler={handleOpen3}
						className='px-0 overflow-auto overflow-y-scroll text-white bg-black_2'
					>
						<div className='flex items-center justify-center py-3 '>
							<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
								Ai Robot Rules FAQ!
							</h4>
							<IoCloseCircleOutline
								className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
								onClick={handleOpen3}
							/>
						</div>
						<hr className='my-2 border border-black_3' />
						<DialogBody className='px-4 overflow-auto '>
							<AiFAQ />
						</DialogBody>
					</Dialog>
				</>
			</ProtectedRoute>
		</Layout>
	);
};

export default AiRobot;
