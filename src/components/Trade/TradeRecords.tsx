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

const headers = [
	{
		id: 1,
		name: 'Symbol',
		class: 'text-left',
	},
	// {
	// 	id: 2,
	// 	name: 'O-Price',
	// 	class: 'text-center',
	// },
	// {
	// 	id: 3,
	// 	name: 'C-Price',
	// 	class: 'text-center',
	// },
	{
		id: 4,
		name: 'Type',
		class: 'text-center',
	},
	{
		id: 5,
		name: 'Amount',
		class: 'text-center',
	},
	{
		id: 6,
		name: 'Action',
		class: 'text-right',
	},
];

const TradeRecords = ({ records }: any) => {
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
			<Card className='w-full h-full bg-black_2'>
				<CardBody className='px-4 rounded'>
					<div className='w-full min-w-max'>
						<div className='bg-[#071832] rounded-t-md'>
							<div className='grid grid-cols-4 list-none '>
								{headers.map((head, index) => {
									return (
										<li key={head.id} className={`py-4  px-2 `}>
											<Typography
												variant='small'
												color='blue-gray'
												className={`
                      ${head.class} font-semibold leading-none text-white opacity-70`}
											>
												{head.name}
											</Typography>
										</li>
									);
								})}
							</div>
						</div>

						<div>
							{records?.slice((currentPage - 1) * 5, currentPage * 5).map(
								(
									game: {
										symbol: string;
										trade_type: string;
										profit: number;
										status: string;
										result: string;
										trade_amount: number;
										_id: string;

										open_price: number;
										close_price: number;
									},
									index: number
								) => {
									const {
										symbol,
										trade_type,
										profit,
										status,
										trade_amount,
										close_price,
										open_price,
										result,
										_id,
									} = game;
									const oddEven =
										index % 2 === 0 ? 'bg-blue-gray-800' : 'bg-blue-gray-900';

									return (
										<>
											<div
												key={_id}
												className={`
                    ${oddEven} grid grid-cols-4  list-none justify-between items-center px-2 py-2 text-xs transition-colors text-blue-gray-200 cursor-pointer 
                    `}
												onClick={() => handleShowMore(_id)}
											>
												<li className=''>
													<p className='font-normal text-left'>{symbol}</p>
												</li>

												<li className=''>
													<div className='flex-col md:flex'>
														{trade_type && (
															<p
																className={`capitalize text-center ${
																	trade_type === 'up'
																		? 'text-[#388E3C]'
																		: 'text-[#D32F2F]'
																}`}
															>
																{trade_type}
															</p>
														)}
													</div>
												</li>
												<li className=''>
													{result === 'win' && (
														<p className='capitalize text-center text-[#388E3C]'>
															+ {Number(profit).toFixed(2)} $
														</p>
													)}
													{result === 'loss' && (
														<p className='capitalize text-center text-[#D32F2F]'>
															- {Number(trade_amount).toFixed(2)} $
														</p>
													)}
													{status === 'pending' && (
														<ClockLoader size={15} color='#FFA000' />
													)}
												</li>

												<li className='flex items-center justify-end '>
													<IoIosArrowDown
														className={`${
															showMore && selected_id === _id
																? 'transform rotate-180'
																: ''
														} text-blue-gray-400 text-xl  transition-all `}
													/>
												</li>
											</div>
											{showMore && selected_id === _id && (
												<div className=''>
													<h2 className='my-2 text-center text-blue-gray-200'>
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
				</CardBody>
				<CardFooter className='flex items-center justify-between p-4 border-t border-blue-gray-50'>
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

export default TradeRecords;
