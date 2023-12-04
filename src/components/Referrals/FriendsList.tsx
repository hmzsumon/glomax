import { useGetMyTeamQuery } from '@/features/auth/authApi';
import { UserIcon } from '@/utils/icons/SecurityIcons';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { formDateWithTime } from '@/utils/functions';
type memberType = {
	_id: string;
	name: string;
	email: string;
	createdAt: string;
	customer_id: string;
	kyc_verified: boolean;
	join_date: Date;
	is_start: boolean;
	level: number;
	total_withdraw: number;
	total_deposit: number;
	is_active: boolean;
};

import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import {
	Card,
	CardHeader,
	Input,
	Typography,
	Button,
	CardBody,
	Chip,
	CardFooter,
	Tabs,
	TabsHeader,
	Tab,
	Avatar,
	IconButton,
	Tooltip,
	Dialog,
	DialogBody,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { HistoryIcon } from '@/global/icons/CommonIcons';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ReferRecords from './ReferRecords';

const TABS = [
	{
		label: 'All',
		value: 'all',
	},
	{
		label: 'L-1',
		value: 'level_1',
	},
	{
		label: 'L-2',
		value: 'level_2',
	},
	{
		label: 'L-3',
		value: 'level_3',
	},
	{
		label: 'L-4',
		value: 'level_4',
	},
	{
		label: 'L-5',
		value: 'level_5',
	},
];

const TABLE_HEAD = ['ID', 'Total Deposit', 'Total Withdraw', 'Status'];

const TABLE_ROWS = [
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
		name: 'John Michael',
		email: 'john@creative-tim.com',
		job: 'Manager',
		org: 'Organization',
		online: true,
		date: '23/04/18',
	},
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
		name: 'Alexa Liras',
		email: 'alexa@creative-tim.com',
		job: 'Programator',
		org: 'Developer',
		online: false,
		date: '23/04/18',
	},
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
		name: 'Laurent Perrier',
		email: 'laurent@creative-tim.com',
		job: 'Executive',
		org: 'Projects',
		online: false,
		date: '19/09/17',
	},
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
		name: 'Michael Levi',
		email: 'michael@creative-tim.com',
		job: 'Programator',
		org: 'Developer',
		online: true,
		date: '24/12/08',
	},
	{
		img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
		name: 'Richard Gran',
		email: 'richard@creative-tim.com',
		job: 'Manager',
		org: 'Executive',
		online: false,
		date: '04/10/21',
	},
];

export default function FriendsList() {
	const [selectedTab, setSelectedTab] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');

	const [openDialog, setOpenDialog] = useState(false);
	const handleOpen = () => setOpenDialog(!openDialog);

	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isError, isSuccess, error } = useGetMyTeamQuery(
		user?._id
	);
	const members: memberType[] = data?.members;

	// filter members
	const filteredMembers = members?.filter((member) =>
		member.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// console.log(filteredMembers);

	let count = 0;
	let activeCount = 0;
	let totalTradeCommission = 0;
	// calculate total trade commission
	if (user) {
		totalTradeCommission =
			user?.trade_com?.level_1 +
			user?.trade_com?.level_2 +
			user?.trade_com?.level_3;
	}
	// find count and active count
	if (selectedTab === 'all') {
		count = members?.length;
		activeCount = members?.filter((member) => member.is_active).length;
	} else if (selectedTab === 'level_1') {
		count = members?.filter((member) => member.level === 1).length;
		activeCount = members?.filter(
			(member) => member.level === 1 && member.is_active
		).length;
	} else if (selectedTab === 'level_2') {
		count = members?.filter((member) => member.level === 2).length;
		activeCount = members?.filter(
			(member) => member.level === 2 && member.is_active
		).length;
	} else if (selectedTab === 'level_3') {
		count = members?.filter((member) => member.level === 3).length;
		activeCount = members?.filter(
			(member) => member.level === 3 && member.is_active
		).length;
	} else if (selectedTab === 'level_4') {
		count = members?.filter((member) => member.level === 4).length;
		activeCount = members?.filter(
			(member) => member.level === 4 && member.is_active
		).length;
	} else if (selectedTab === 'level_5') {
		count = members?.filter((member) => member.level === 5).length;
		activeCount = members?.filter(
			(member) => member.level === 5 && member.is_active
		).length;
	}

	return (
		<div className='mx-auto md:w-7/12'>
			<Card className='w-full h-full bg-blue-gray-900'>
				<div className='grid grid-cols-2 mt-4'>
					<div className='flex items-center gap-2 px-4 '>
						<FiUserPlus className='inline-block mr-1 text-2xl cursor-pointer text-blue-gray-200' />
						<h1 className='text-xl font-bold text-blue-gray-200 '>
							My Friends{' '}
						</h1>
					</div>

					<div className='mr-4 justify-self-end'>
						<span className='cursor-pointer' onClick={handleOpen}>
							<HistoryIcon h={6} w={6} color={'gray'} />
						</span>
					</div>
				</div>
				<div className='flex items-center justify-between px-4 mt-2 text-blue-gray-200 '>
					<small>
						Referral Bonus:{' '}
						<span className='text-green-500'>
							{Number(user?.referral_bonus).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</span>
					</small>
					{selectedTab === 'all' && (
						<small>
							Trade Commission:{' '}
							<span className='text-green-500'>
								{Number(totalTradeCommission).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</span>
						</small>
					)}
					{selectedTab === 'level_1' && (
						<small>
							1<sup>st</sup> Level Commission:{' '}
							<span className='text-green-500'>
								{Number(user?.trade_com?.level_1).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</span>
						</small>
					)}
					{selectedTab === 'level_2' && (
						<small>
							2<sup>nd</sup> Level Commission:{' '}
							<span className='text-green-500'>
								{Number(user?.trade_com?.level_2).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</span>
						</small>
					)}
					{selectedTab === 'level_3' && (
						<small>
							3<sup>rd</sup> Level Commission:{' '}
							<span className='text-green-500'>
								{Number(user?.trade_com?.level_3).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</span>
						</small>
					)}

					{selectedTab === 'level_4' && (
						<small>
							4<sup>th</sup> Level Commission:{' '}
							<span className='text-green-500'>
								{Number(user?.trade_com?.level_4).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</span>
						</small>
					)}

					{selectedTab === 'level_5' && (
						<small>
							5<sup>th</sup> Level Commission:{' '}
							<span className='text-green-500'>
								{Number(user?.trade_com?.level_5).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</span>
						</small>
					)}
				</div>
				<CardHeader floated={false} shadow={false} className='rounded-none'>
					<div className='flex flex-col items-center justify-between gap-4 bg-blue-gray-900'>
						{' '}
						<Tabs value='all' className='w-full '>
							<TabsHeader>
								{TABS.map(({ label, value }) => (
									<Tab
										key={value}
										value={value}
										className='text-xs font-semibold md:text-sm'
										onClick={() => setSelectedTab(value)}
									>
										&nbsp;&nbsp;{label}&nbsp;&nbsp;{' '}
										{selectedTab === value && (
											<sup>
												{count}/{activeCount}
											</sup>
										)}
									</Tab>
								))}
							</TabsHeader>
						</Tabs>
						<div className='w-full '>
							<Input
								label='Search'
								icon={<MagnifyingGlassIcon className='w-5 h-5' />}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='text-white'
							/>
						</div>
					</div>
				</CardHeader>
				<CardBody className='px-0 overflow-scroll'>
					<table className='w-full mt-4 text-left table-auto min-w-max'>
						<thead>
							<tr>
								{TABLE_HEAD.map((head, index) => (
									<th
										key={head}
										className='p-4 transition-colors cursor-pointer border-y border-blue-gray-800 bg-blue-gray-700 hover:bg-blue-gray-800'
									>
										<Typography
											variant='small'
											color='blue-gray'
											className={` items-center justify-between gap-2 font-normal leading-none text-white opacity-70`}
										>
											{head}
										</Typography>
									</th>
								))}
							</tr>
						</thead>
						{filteredMembers?.length > 0 ? (
							<tbody>
								{filteredMembers
									.filter((member) => {
										if (selectedTab === 'all') return true;
										if (selectedTab === 'level_1') return member.level === 1;
										if (selectedTab === 'level_2') return member.level === 2;
										if (selectedTab === 'level_3') return member.level === 3;
										if (selectedTab === 'level_4') return member.level === 4;
										if (selectedTab === 'level_5') return member.level === 5;
										return false;
									})
									.slice((currentPage - 1) * 5, currentPage * 5)
									.map(
										(
											{
												email,
												createdAt,
												customer_id,
												kyc_verified,
												join_date,
												name,
												is_active,
												level,
												total_withdraw,
												total_deposit,
											},
											index
										) => {
											const isLast = index === TABLE_ROWS.length - 1;
											const classes = isLast
												? 'p-4'
												: 'p-4 border-b border-blue-gray-50';

											return (
												<tr key={email}>
													<td className={classes}>
														<div className='flex items-center gap-3 text-white'>
															<UserIcon h={40} w={40} />
															<div className='flex flex-col'>
																<Typography
																	variant='small'
																	color='blue-gray'
																	className='font-normal text-white'
																>
																	{customer_id}{' '}
																	<sup className='text-yellow-700 '>
																		{level}
																	</sup>
																</Typography>
																<Typography
																	variant='small'
																	color='blue-gray'
																	className='font-normal text-white opacity-70'
																>
																	{name}
																</Typography>
																<Typography
																	variant='small'
																	color='blue-gray'
																	className='text-xs font-normal text-white'
																>
																	{formDateWithTime(join_date)}
																</Typography>
															</div>
														</div>
													</td>
													<td className={classes}>
														<div className='flex-col md:flex'>
															<Typography
																variant='small'
																color='blue-gray'
																className='font-normal text-white'
															>
																{Number(total_deposit).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Typography>
														</div>
													</td>
													<td className={classes}>
														<div className='text-white w-max'>
															<Typography
																variant='small'
																color='blue-gray'
																className='font-normal text-white'
															>
																{Number(total_withdraw).toLocaleString(
																	'en-US',
																	{
																		style: 'currency',
																		currency: 'USD',
																	}
																)}
															</Typography>
														</div>
													</td>
													<td className={classes}>
														<div className='w-max'>
															<Chip
																variant='ghost'
																size='sm'
																value={is_active ? 'Active' : 'Inactive'}
																color={is_active ? 'green' : 'blue-gray'}
																className={` ${
																	is_active
																		? 'text-green-500'
																		: 'text-orange-700'
																}`}
															/>
														</div>
													</td>
												</tr>
											);
										}
									)}
							</tbody>
						) : (
							<tbody>
								<div className='flex items-center justify-center h-full'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-normal text-center text-white'
									>
										No Members
									</Typography>
								</div>
							</tbody>
						)}
					</table>
				</CardBody>
				<CardFooter className='flex items-center justify-between p-4 border-t border-blue-gray-50'>
					<Typography
						variant='small'
						color='blue-gray'
						className='font-normal text-white'
					>
						Page {currentPage} of {Math.ceil(members?.length / 5)}
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
								currentPage === Math.ceil(members?.length / 5) ||
								members?.length < 5
							}
							onClick={() => setCurrentPage(currentPage + 1)}
						>
							Next
						</Button>
					</div>
				</CardFooter>
			</Card>
			{/* For records */}
			<>
				<Dialog
					open={openDialog}
					handler={handleOpen}
					className='px-0 overflow-auto text-white bg-black_2'
				>
					<div className='flex items-center justify-center py-3 '>
						<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
							Refer & Commission
						</h4>
						<IoCloseCircleOutline
							className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
							onClick={handleOpen}
						/>
					</div>
					<hr className='my-2 border border-black_3' />
					<DialogBody className='px-0 overflow-auto '>
						<ReferRecords />
					</DialogBody>
				</Dialog>
			</>
		</div>
	);
}
