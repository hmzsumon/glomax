import {
	Typography,
	List,
	ListItem,
	ListItemPrefix,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { BiWallet } from 'react-icons/bi';
import { CiBadgeDollar } from 'react-icons/ci';
import { MdDashboardCustomize } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { FiUserPlus } from 'react-icons/fi';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

export function Sidebar() {
	const router = useRouter();

	const sideItems = [
		{
			id: 1,
			title: 'Dashboard',
			icon: <MdDashboardCustomize />,
			cb: () => router.push('/'),
		},
		{
			id: 2,
			title: 'Profile',
			icon: <FaRegUserCircle />,
			cb: () => router.push('/profile'),
		},
		{
			id: 3,
			title: 'Wallet',
			icon: <BiWallet />,
			cb: () => router.push('/wallet'),
		},
		{
			id: 4,
			title: 'Referral',
			icon: <FiUserPlus />,
			cb: () => router.push('/referral'),
		},
		{
			id: 5,
			title: 'Rewards',
			icon: <CiBadgeDollar />,
			cb: () => router.push('/rewards'),
		},
		{
			id: 6,
			title: 'Settings',
			icon: <IoIosSettings />,
			cb: () => router.push('/security'),
		},
	];

	return (
		<>
			<div className='text-blue-gray-100 !important'>
				<List>
					{sideItems.map((item) => (
						<ListItem
							key={item.id}
							className=' cursor-pointer text-blue-gray-100'
							onClick={() => item.cb()}
						>
							<ListItemPrefix className='text-xl '>{item.icon}</ListItemPrefix>
							<Typography className='text-sm'>{item.title}</Typography>
						</ListItem>
					))}
				</List>
			</div>
		</>
	);
}
