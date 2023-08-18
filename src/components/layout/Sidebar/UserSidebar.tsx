import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IoDiamondOutline } from 'react-icons/io5';
import { RiDashboardFill, RiWallet3Fill } from 'react-icons/ri';
import { MdWorkHistory, MdNotifications, MdLogout } from 'react-icons/md';
import { AiOutlineSecurityScan } from 'react-icons/ai';
import { HiIdentification } from 'react-icons/hi';
import { FaUserPlus } from 'react-icons/fa';
import { SlBadge } from 'react-icons/sl';
import { IoMdArrowDropdown } from 'react-icons/io';
import SubMenuItem from './SubMenuItem';
import { useLogoutUserMutation } from '@/features/auth/authApi';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
	FetchBaseQueryError,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { type } from 'os';
import { fetchBaseQueryError } from '@/services/helpers';

const UserSidebar = () => {
	const router = useRouter();
	const { user } = useSelector((state: any) => state.auth);

	const [logOut, { isSuccess, isLoading, isError, error }] =
		useLogoutUserMutation();
	const [showSubMenu, setShowSubMenu] = useState(false);
	// default selected item is 1

	// handleShowSubMenu is a function that toggles the value of showSubMenu
	const handleShowSubMenu = () => {
		setShowSubMenu(!showSubMenu);
	};

	const sidebarItems = [
		{
			id: 1,
			name: 'Dashboard',
			link: '/dashboard',
			icon: <RiDashboardFill />,
			isSubMenu: false,
			calBack: () => router.push('/dashboard'),
		},
		{
			id: 2,
			name: 'Wallet',
			link: '/wallet',
			icon: <RiWallet3Fill />,
			calBack: () => handleShowSubMenu(),
			subItems: [
				{ id: 1, name: 'Overview', link: '/wallet/overview' },
				{ id: 2, name: 'Spot', link: '/wallet/spot' },
				{ id: 3, name: 'Funding', link: '/wallet/funding' },
				{ id: 4, name: 'Earn', link: '/wallet/earn' },
				{ id: 5, name: 'Mining', link: '/wallet/mining' },
			],
			isSubMenu: true,
		},
		{
			id: 3,
			name: 'History',
			link: '/history',
			icon: <MdWorkHistory />,
			calBack: () => handleShowSubMenu(),
			subItems: [
				{ id: 1, name: 'Payment', link: '/payment-history' },
				{ id: 2, name: 'Convert', link: '/convert-history' },
				{ id: 3, name: 'Transfer', link: '/transfer-history' },
				{ id: 4, name: 'Trade', link: '/trade-history' },
				{ id: 5, name: 'Game History', link: '/game-history' },
				{ id: 6, name: 'Mining History', link: '/mining-history' },
			],
			isSubMenu: true,
		},
		{
			id: 4,
			name: 'Security',
			link: '/security',
			icon: <AiOutlineSecurityScan />,
			calBack: () => router.push('/security'),
			isSubMenu: false,
		},
		{
			id: 5,
			name: 'Identification',
			link: '/identification',
			icon: <HiIdentification />,
			calBack: () => console.log('hello'),
			isSubMenu: false,
		},
		{
			id: 6,
			name: 'Referral',
			link: '/referral',
			icon: <FaUserPlus />,
			calBack: () => router.push('/referral'),
			isSubMenu: false,
		},
		{
			id: 7,
			name: 'Rewards',
			link: '/rewards',
			icon: <SlBadge />,
			calBack: () => console.log('hello'),
			isSubMenu: false,
		},

		{
			id: 8,
			name: 'Notifications',
			link: '/notifications',
			icon: <MdNotifications />,
			calBack: () => console.log('hello'),
			isSubMenu: false,
		},
	];

	// handle logout
	const handleLogout = () => {
		logOut({
			email: user.email,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Logout Successful');
			router.push('/');
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
	}, [isSuccess]);
	return (
		<div className=''>
			<div className='px-4 '>
				<p>{user?.email}</p>
				<div className='flex items-center gap-1 text-sm text-yellow-700 '>
					<IoDiamondOutline />
					<p>Regular User</p>
				</div>
			</div>
			<div className='my-6 '>
				<ul className=''>
					{sidebarItems.map((item) => {
						if (item.isSubMenu) {
							return <SubMenuItem key={item.id} item={item} />;
						}
						return (
							<div
								key={item.id}
								className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-700'
								onClick={item.calBack}
							>
								<li className='flex items-center gap-2 text-white cursor-pointer hover:text-yellow-700 '>
									{item.icon}
									<p>{item.name}</p>
								</li>
							</div>
						);
					})}
				</ul>
			</div>
			<hr />
			<div className='px-4 my-8'>
				<button
					className='flex items-center gap-2 hover:text-red-500 '
					onClick={handleLogout}
				>
					<MdLogout />
					<p>Logout</p>
				</button>
			</div>
		</div>
	);
};

export default UserSidebar;
