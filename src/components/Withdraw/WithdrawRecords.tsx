import React, { useState, useEffect } from 'react';
import {
	Card,
	Typography,
	Button,
	CardBody,
	CardFooter,
} from '@material-tailwind/react';
import { NotFoundIcon } from '@/global/icons/CommonIcons';
import { IoIosArrowDown } from 'react-icons/io';
import ClockLoader from 'react-spinners/ClockLoader';
import Withdraw from './Withdraw';
import { formDate } from '@/utils/functions';

const headers = [
	{
		id: 1,
		name: 'Date',
		class: 'text-left',
	},

	{
		id: 4,
		name: 'Amount',
		class: 'text-center',
	},
	{
		id: 5,
		name: 'Status',
		class: 'text-center',
	},
	{
		id: 6,
		name: 'Action',
		class: 'text-right',
	},
];

const WithdrawRecords = ({ records }: any) => {
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
									withdraw: {
										createdAt: Date;
										amount: string;
										status: string;
										_id: string;
									},
									index: number
								) => {
									const { createdAt, amount, status, _id } = withdraw;
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
													<p className='font-normal text-left'>
														{formDate(createdAt)}
													</p>
												</li>

												<li className='text-center '>
													{Number(amount).toLocaleString('en-US', {
														style: 'currency',
														currency: 'USD',
													})}
												</li>
												<li className=''>
													{status === 'approved' && (
														<p className='capitalize text-center text-[#388E3C]'>
															Successful
														</p>
													)}

													{status === 'pending' && (
														<p className='text-center text-yellow-700 capitalize '>
															Processing
														</p>
													)}

													{status === 'rejected' && (
														<p className='text-center text-red-500 capitalize'>
															Rejected
														</p>
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
													<Withdraw record={selectedItem} />
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

export default WithdrawRecords;
