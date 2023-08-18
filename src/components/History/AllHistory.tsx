import {
	useGetLoggedInUserLevel1MembersQuery,
	useGetMyTeamQuery,
} from '@/features/auth/authApi';
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
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const TABLE_HEAD = ['ID', 'Registration Date', 'Bonus', ''];

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

export default function AllHistory() {
	const [currentPage, setCurrentPage] = useState(1);
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isError, isSuccess, error } =
		useGetLoggedInUserLevel1MembersQuery(user?._id);
	const members: memberType[] = data?.members;

	return (
		<Card className='w-full h-full bg-blue-gray-900'>
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
										className={` ${
											index === 1 && ' hidden md:block'
										} items-center justify-between gap-2 font-normal leading-none text-white opacity-70`}
									>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					{members?.length > 0 ? (
						<tbody>
							{members.map(
								(
									{
										email,
										createdAt,
										customer_id,
										kyc_verified,
										join_date,
										is_start,
										level,
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
															{customer_id}
														</Typography>
														<Typography
															variant='small'
															color='blue-gray'
															className='font-normal text-white opacity-70'
														>
															{email}
														</Typography>
														<Typography
															variant='small'
															color='blue-gray'
															className='text-xs font-normal text-white md:hidden'
														>
															{formDateWithTime(join_date)}
														</Typography>
													</div>
												</div>
											</td>
											<td className={classes}>
												<div className='flex-col hidden md:flex'>
													<Typography
														variant='small'
														color='blue-gray'
														className='font-normal text-white'
													>
														{formDateWithTime(join_date)}
													</Typography>
												</div>
											</td>
											<td className={classes}>
												<div className='text-white w-max'>10 wfc</div>
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
	);
}
