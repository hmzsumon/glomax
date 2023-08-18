import React, { useState, useEffect } from 'react';
import {
	Card,
	CardHeader,
	Typography,
	Button,
	CardBody,
	CardFooter,
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { winGameInterface } from '@/types/myInterface';
import { useGetLoggedInUserRecordsQuery } from '@/features/winGame/winGameApi';
import { NotFoundIcon } from '@/global/icons/CommonIcons';
import useTimer from '@/hooks/useTimer';
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import ClockLoader from 'react-spinners/ClockLoader';
import TradeDetails from './TradeDetails';
const TABLE_HEAD = ['Period', 'Status', 'Amount'];

const AiTradeRecords = ({ open }: any) => {
	const { user } = useSelector((state: any) => state.auth);
	const { data, refetch } = useGetLoggedInUserRecordsQuery(user?._id);

	// refetch data on open
	useEffect(() => {
		if (open) {
			refetch();
		}
	}, [open]);

	const { records } = data || { records: [] };

	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [showMore, setShowMore] = useState(false);
	const [selected_id, setSelected_id] = useState<string | null>(null);
	const [selectedItem, setSelectedItem] = useState<any>(null);

	// handle show more
	const handleShowMore = (id: string) => {
		setSelected_id(id);
		records.find((item: any) => {
			if (item._id === id) {
				setSelectedItem(item);
			}
		});

		setShowMore(!showMore);
	};

	return (
		<div className='mx-auto '>
			<Card className=' bg-black_2'>
				<div className=' rounded'>
					<div className='w-full'>
						<div className='bg-[#071832] rounded-t-md'>
							<div className='grid grid-cols-3 list-none '>
								{TABLE_HEAD.map((head, index) => (
									<li
										key={head}
										className='p-4 transition-colors cursor-pointer rounded-t-md bg-[#071832] '
									>
										<Typography
											variant='small'
											color='blue-gray'
											className={`items-center text-center justify-between gap-2 font-normal leading-none text-white opacity-70`}
										>
											{head}
										</Typography>
									</li>
								))}
							</div>
						</div>

						<div>
							{records.slice((currentPage - 1) * 5, currentPage * 5).map(
								(
									game: {
										period: number;
										win_number: string;
										trade_colors: any;
										status: string;
										trade_amount: number;
										_id: string;
										win_amount: number;
									},
									index: number
								) => {
									const {
										period,
										win_number,
										trade_colors,
										status,
										trade_amount,
										win_amount,
										_id,
									} = game;
									const oddEven =
										index % 2 === 0 ? 'bg-blue-gray-800' : 'bg-blue-gray-900';

									return (
										<>
											<div
												key={period}
												className={`
                    ${oddEven} grid grid-cols-3 list-none justify-between items-center px-4 py-1 text-xs transition-colors cursor-pointer 
                    `}
												onClick={() => handleShowMore(_id)}
											>
												<li className=''>
													<Typography
														variant='small'
														color='blue-gray'
														className='py-2 font-normal text-center text-white'
													>
														{period}
													</Typography>
												</li>
												<li className=''>
													<div className='flex-col md:flex'>
														{status === 'win' && (
															<p className='capitalize text-center text-[#388E3C]'>
																{status}
															</p>
														)}
														{status === 'lose' && (
															<p className='capitalize text-center text-[#D32F2F]'>
																{status}
															</p>
														)}
														{status === 'pending' && (
															<p className='capitalize text-center text-[#FFA000]'>
																{status}
															</p>
														)}
													</div>
												</li>
												<li className='grid items-center justify-around grid-cols-2 ml-2 '>
													<div className='flex items-center justify-end'>
														{status === 'win' && (
															<p className='capitalize text-center text-[#388E3C]'>
																+ {Number(win_amount).toFixed(2)} $
															</p>
														)}
														{status === 'lose' && (
															<p className='capitalize text-center text-[#D32F2F]'>
																- {Number(trade_amount).toFixed(2)} $
															</p>
														)}
														{status === 'pending' && (
															<ClockLoader size={15} color='#FFA000' />
														)}
													</div>
													<div className='flex items-center justify-end '>
														<IoIosArrowDown
															className={`${
																showMore && selected_id === _id
																	? 'transform rotate-180'
																	: ''
															} text-blue-gray-400 text-xl  transition-all `}
														/>
													</div>
												</li>
											</div>
											{showMore && selected_id === _id && (
												<div className=''>
													<h2 className='my-2 text-center  text-blue-gray-200'>
														Trad Details
													</h2>
													<TradeDetails record={selectedItem} />
												</div>
											)}
										</>
									);
								}
							)}
						</div>
					</div>

					{records?.length === 0 && (
						<div className='flex flex-col items-center justify-center gap-3'>
							<NotFoundIcon h={20} w={20} color={'gray'} />
							<p className='text-white'>No records found.</p>
						</div>
					)}
				</div>
				<CardFooter className='flex items-center justify-between p-4 border-t border-blue-gray-600'>
					<Typography
						variant='small'
						color='blue-gray'
						className='font-normal text-white'
					>
						Page {currentPage} of {Math.ceil(records?.length / 5)}
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
								currentPage === Math.ceil(records?.length / 5) ||
								records?.length < 5
							}
							onClick={() => setCurrentPage(currentPage + 1)}
						>
							Next
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default AiTradeRecords;
