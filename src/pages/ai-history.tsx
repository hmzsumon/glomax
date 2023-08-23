import React, { useState } from 'react';
import Layout from '@/Layout';
import { useGetAllAiRobotQuery } from '@/features/aiRobot/aiRobotApi';
import { useGetLoggedInUserRecordsQuery } from '@/features/winGame/winGameApi';
import ProtectedRoute from '@/global/ProtectedRoute';
import { NotFoundIcon } from '@/utils/icons/CommonIcons';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Typography,
} from '@material-tailwind/react';
import { formDateWithTime } from '@/utils/functions';
import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { HiArrowSmLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import AiRobotDetails from '@/components/AiRobot/AiRobotDitails';

const headers = [
	{
		id: 1,
		title: 'Date',
		className: 'text-left',
	},
	{
		id: 2,
		title: 'Profit/Loss',
		className: 'text-center',
	},
	{
		id: 3,
		title: 'Status',
		className: 'text-center',
	},
	{
		id: 4,
		title: 'Details',
		className: 'text-right',
	},
];

const AiHistory = () => {
	const router = useRouter();
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isSuccess, isError, error } =
		useGetAllAiRobotQuery(undefined);
	const { aiRobots } = data || { aiRobots: [] };

	const [currentPage, setCurrentPage] = useState(1);
	const [showMore, setShowMore] = useState(false);
	const [selected_id, setSelected_id] = useState<string | null>(null);
	const [selectedItem, setSelectedItem] = useState<any>(null);

	// handle show more
	const handleShowMore = (id: string) => {
		setSelected_id(id);
		aiRobots.find((item: any) => {
			if (item._id === id) {
				setSelectedItem(item);
			}
		});

		setShowMore(!showMore);
	};
	return (
		<Layout>
			<ProtectedRoute>
				<div className='pt-20 pb-24  h-screen md:h-auto px-2 ai-wrapper'>
					{/* <div className='ai-overlay'></div> */}
					<div className=''>
						<div className=' px-2 py-6 mx-auto rounded-lg  bg-black_2 md:w-7/12'>
							{/* Header Start */}
							<div className=' grid grid-cols-3 mb-4'>
								<div className=' col-span-1'>
									<HiArrowSmLeft
										className='text-2xl text-blue-gray-300 cursor-pointer hover:text-blue-700'
										onClick={() => router.back()}
									/>
								</div>
								<div className=' ml-4 md:ml-12 col-span-2 '>
									<h2 className=' text-xl font-semibold text-blue-gray-200'>
										Ai History
									</h2>
								</div>
							</div>
							{/* Header End */}
							<div className=''>
								{aiRobots?.length > 0 ? (
									<div className=''>
										<ul className=' text-blue-gray-200 rounded-t-sm text-sm grid grid-cols-4 px-2 py-4 bg-black_3'>
											{headers.map((header) => (
												<li key={header.id} className={`${header.className}`}>
													{header.title}
												</li>
											))}
										</ul>
										<div>
											{aiRobots
												?.slice((currentPage - 1) * 9, currentPage * 9)
												.map((item: any, index: number) => {
													const oddEven =
														index % 2 === 0
															? 'bg-blue-gray-800'
															: 'bg-blue-gray-900';
													return (
														<>
															<ul
																key={index}
																className={`${oddEven} text-xs md:text-sm grid grid-cols-4 px-2 py-2 cursor-pointer transition-colors `}
																onClick={() => handleShowMore(item?._id)}
															>
																<li>
																	<span className='text-blue-gray-200'>
																		{new Date(
																			item.close_time
																		).toLocaleDateString()}
																	</span>
																</li>
																<li className='text-center'>
																	<span
																		className={` ${
																			Number(item?.take_profit) > 0
																				? 'text-green-500'
																				: 'text-deep-orange-500'
																		}`}
																	>
																		${' '}
																		{Number(item?.take_profit).toLocaleString(
																			'en-US',
																			{
																				minimumFractionDigits: 2,
																			}
																		)}{' '}
																	</span>
																</li>
																<li className='text-center'>
																	<span
																		className={` ${
																			item?.status === 'completed'
																				? 'text-green-500'
																				: 'text-deep-orange-500'
																		}`}
																	>
																		{item?.status}
																	</span>
																</li>
																<li className='text-right'>
																	<div className='flex items-center justify-end '>
																		<IoIosArrowDown
																			className={`${
																				showMore && selected_id === item?._id
																					? 'transform rotate-180'
																					: ''
																			} text-blue-gray-400 text-xl  transition-all `}
																		/>
																	</div>
																</li>
															</ul>
															{showMore && selected_id === item?._id && (
																<div className=''>
																	<AiRobotDetails record={selectedItem} />
																</div>
															)}
														</>
													);
												})}
										</div>
									</div>
								) : (
									<div className='flex flex-col mt-24  items-center justify-center gap-3'>
										<NotFoundIcon h={20} w={20} color={'gray'} />
										<p className='text-white'>No records found.</p>
									</div>
								)}
							</div>
							{/* Footer Start */}
							{aiRobots?.length > 0 && (
								<div className=' flex items-center justify-between px-4 py-2 border-t border-blue-gray-800 mt-2'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-normal text-white'
									>
										Page {currentPage} of {Math.ceil(aiRobots?.length / 9)}
									</Typography>
									<div className='flex gap-2'>
										<Button
											variant='outlined'
											color='blue-gray'
											size='sm'
											disabled={currentPage === 1}
											onClick={() => setCurrentPage(currentPage - 1)}
										>
											Previous
										</Button>
										<Button
											variant='outlined'
											color='blue-gray'
											size='sm'
											disabled={
												currentPage === Math.ceil(aiRobots?.length / 9) ||
												aiRobots?.length < 9
											}
											onClick={() => setCurrentPage(currentPage + 1)}
										>
											Next
										</Button>
									</div>
								</div>
							)}
							{/* Footer End */}
						</div>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default AiHistory;
