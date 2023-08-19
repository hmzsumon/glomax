import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, CardBody } from '@material-tailwind/react';

import { NotFoundIcon } from '@/global/icons/CommonIcons';
import { useSelector } from 'react-redux';

import { useMyConvertRecordsQuery } from '@/features/convert/convertApi';
import { formDateWithTime } from '@/utils/functions';

const headers = [
	{
		id: 1,
		name: 'Date',
		class: 'text-left',
	},
	{
		id: 2,
		name: 'From',
		class: 'text-center',
	},
	{
		id: 3,
		name: 'To',
		class: 'text-center',
	},
	{
		id: 4,
		name: 'Amount',
		class: 'text-center',
	},
	{
		id: 5,
		name: 'Status',
		class: 'text-right',
	},
];

const ConvertRecords = ({ open }: any) => {
	const { user } = useSelector((state: any) => state.auth);
	const { data } = useMyConvertRecordsQuery(undefined, {
		skip: !open,
	});

	const { records } = data || { records: [] };

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
					<div className='w-full text-left table-auto min-w-max'>
						<div className='bg-[#071832] rounded-t-md'>
							<div className='grid grid-cols-5 list-none px-2 '>
								{headers.map((head, index) => (
									<li
										key={head.id}
										className={`py-2 font-normal text-blue-gray-100 ${head.class}`}
									>
										<span>{head.name}</span>
									</li>
								))}
							</div>
						</div>

						<div>
							{records.slice((currentPage - 1) * 5, currentPage * 5).map(
								(
									game: {
										amount: number;
										createdAt: any;
										from: string;
										status: string;
										to: string;
										_id: string;
									},
									index: number
								) => {
									const { amount, createdAt, from, status, to, _id } = game;
									const oddEven =
										index % 2 === 0 ? 'bg-blue-gray-800' : 'bg-blue-gray-900';

									return (
										<>
											<div
												key={_id}
												className={`
                    ${oddEven} grid grid-cols-5 list-none justify-between text-blue-gray-200  px-2 py-1 text-xs transition-colors cursor-pointer 
                    `}
												onClick={() => handleShowMore(_id)}
											>
												<li className=''>
													<p className='py-2 font-normal text-left '>
														{formDateWithTime(createdAt)}
													</p>
												</li>
												<li className='text-center'>
													<p>{from}</p>
												</li>
												<li className='text-center '>
													<p>{to}</p>
												</li>
												<li className='  text-right '>
													<p className='mr-10'>{amount} USDT</p>
												</li>
												<li className=' text-right '>
													<p>{status}</p>
												</li>
											</div>
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
				<div className='flex  items-center justify-between p-4 border-t border-blue-gray-50'>
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
				</div>
			</Card>
		</div>
	);
};

export default ConvertRecords;
