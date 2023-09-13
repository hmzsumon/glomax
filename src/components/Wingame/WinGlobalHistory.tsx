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
import { useGetWinGameResultQuery } from '@/features/winGame/winGameApi';
import { NotFoundIcon } from '@/global/icons/CommonIcons';
import useTimer from '@/hooks/useTimer';
import { useSelector } from 'react-redux';
import { useLoadUserQuery } from '@/features/auth/authApi';
const TABS = [
	{
		id: 1,
		title: '1 Minute',
		value: 'game_1m',
		link: '/wingame',
	},
	{
		id: 2,
		title: '3 Minute',
		value: 'game_3m',
		link: '/wingame-three',
	},
	{
		id: 3,
		title: '5 Minute',
		value: 'game_5m',
		link: '/wingame-five',
	},
];
const TABLE_HEAD = ['Period', 'Win Number', 'Win Color'];

const WinGlobalHistory: React.FC<winGameInterface> = ({ game }) => {
	const { user } = useSelector((state: any) => state.auth);
	const { refetch: refetch2 } = useLoadUserQuery(user?._id);
	const {
		remainingSeconds: timer,
		gameId,
		setTimer,
	} = useTimer({
		gameType: game?.game_type,
	});

	const { data, refetch } = useGetWinGameResultQuery(game?.game_type);

	// setIsGet(true) by timer
	useEffect(() => {
		if (timer === 0) {
			refetch();
			refetch2();
		}
	}, [timer]);

	console.log('timer', timer);

	const { results } = data || { results: [] };

	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<div className='mx-auto '>
			<Card className='w-full h-full bg-black_2'>
				<CardHeader floated={false} shadow={false} className='rounded-none'>
					<div className='flex flex-col items-center justify-between gap-4 bg-blue-gray-900'>
						{' '}
						<div className='w-full py-2 flex items-center justify-around  bg-[#071832] '>
							{TABS.map((item) => (
								<Link
									key={item.id}
									href={item.link}
									className={`flex gap-1 flex-col py-1 w-full rounded-lg items-center text-blue-gray-100 ${
										router.pathname === item.link
											? 'bg-yellow-800 text-blue-gray-900'
											: 'text-blue-gray-100'
									} `}
								>
									<span className='text-xs md:text-sm'>{item.title}</span>
								</Link>
							))}
						</div>
					</div>
				</CardHeader>
				<CardBody className='px-4 rounded'>
					<table className='w-full text-left table-auto min-w-max'>
						<thead>
							<tr>
								{TABLE_HEAD.map((head, index) => (
									<th
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
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{results
								.slice((currentPage - 1) * 10, currentPage * 10)
								.map(
									(
										game: { period_no: any; win_number: any; win_colors: any },
										index: number
									) => {
										const { period_no, win_number, win_colors } = game;
										const oddEven =
											index % 2 === 0 ? 'bg-blue-gray-800' : 'bg-blue-gray-900';

										return (
											<tr
												key={period_no}
												className={`
                    ${oddEven}  
                    `}
											>
												<td className=''>
													<Typography
														variant='small'
														color='blue-gray'
														className='py-2 font-normal text-center text-white'
													>
														{period_no}
													</Typography>
												</td>
												<td className=''>
													<div className='flex-col md:flex'>
														<p
															className='text-center md:text-xl md:font-bold'
															style={{ color: win_colors[0] }}
														>
															{win_number}
														</p>
													</div>
												</td>
												<td className=''>
													<div className='flex items-center justify-center'>
														{win_colors.map(
															(
																color: any,
																index: React.Key | null | undefined
															) => (
																<div
																	key={index}
																	className='w-4 h-4 mr-1 rounded-md'
																	style={{ backgroundColor: color }}
																></div>
															)
														)}
													</div>
												</td>
											</tr>
										);
									}
								)}
						</tbody>
					</table>

					{results?.length === 0 && (
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
						Page {currentPage} of {Math.ceil(results?.length / 10)}
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
								currentPage === Math.ceil(results?.length / 10) ||
								results?.length < 10
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

export default WinGlobalHistory;
