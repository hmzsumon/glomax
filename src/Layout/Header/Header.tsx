import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CloseIcon2, ExplanationIcon } from '@/utils/icons/CommonIcons';
import { toast } from 'react-toastify';
import {
	Navbar,
	Typography,
	IconButton,
	Avatar,
	Drawer,
	Button,
	Badge,
	Popover,
	PopoverHandler,
	PopoverContent,
	MenuHandler,
	MenuList,
	MenuItem,
	Menu,
	Dialog,
	DialogHeader,
	DialogBody,
} from '@material-tailwind/react';
import { BiSolidWallet } from 'react-icons/bi';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Sidebar } from './Sidebar';
import { maskEmail } from '@/utils/functions';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdPowerSettingsNew } from 'react-icons/md';
import {
	useLoadUserQuery,
	useLogoutUserMutation,
} from '@/features/auth/authApi';
import { WalletIcon } from '@/global/icons/CommonIcons';
import CopyToClipboard from '@/global/CopyToClipboard';
import UserInfo from './UserInfo';
import Cookies from 'js-cookie';
import { FaBell } from 'react-icons/fa';
import {
	useGetNotificationsQuery,
	useUpdateNotificationMutation,
} from '@/features/notify/notificationApi';
import socketIOClient from 'socket.io-client';
import ioBaseUrl from '@/config/ioBaseUrl';
import { m } from 'framer-motion';
import Wallet from '../../pages/wallet';
import { useRouter } from 'next/router';

export default function Header() {
	const router = useRouter();
	const path = router.pathname;

	const token = Cookies.get('token');
	const {
		data,
		refetch,
		isLoading,
		isError,
		error,
		isSuccess: n_isSuccess,
	} = useGetNotificationsQuery(undefined);

	const [fetch, setFetch] = useState(false);
	const { data: userData, refetch: refetch2 } = useLoadUserQuery();

	const [updateNotification, {}] = useUpdateNotificationMutation();

	const { notifications } = data || [];
	const [logoutUser, { isSuccess }] = useLogoutUserMutation();

	const [notiFication, setNotiFication] = useState({
		subject: '',
		description: '',
	});

	const [count, setCount] = React.useState(notifications?.length);
	useEffect(() => {
		setCount(notifications?.length);
	}, [notifications]);

	const { user } = useSelector((state: any) => state.auth);
	const [openRight, setOpenRight] = React.useState(false);
	const openDrawerRight = () => setOpenRight(true);
	const closeDrawerRight = () => setOpenRight(false);
	const [open2, setOpen2] = useState(false);
	const handleOpen2 = () => setOpen2(!open2);

	// handle notification
	const handleNotification = async (id: any) => {
		// find notification by id
		const notification = notifications?.find((n: any) => n._id === id);
		setNotiFication(notification);
		handleOpen2();
		updateNotification({
			id: id as string,
			is_read: true,
		});
		setFetch(true);
		refetch();
		refetch2();
	};

	function playNotificationSound() {
		const audio = new Audio('/sounds/user-notification.wav');
		audio.play();
	}

	// set notifications and play sound
	function setNotification(notification: any) {
		playNotificationSound();
		setFetch(true);
		refetch();
		refetch2();
	}

	useEffect(() => {
		const socket = socketIOClient(ioBaseUrl, {
			transports: ['websocket', 'polling'],
		});

		socket.on('connect', () => {
			console.log('connected');
		});
		socket.on('user-notification', (notification: any) => {
			console.log('notification', notification);
			if (notification?.user_id === user?._id) {
				setNotification(notification);
				setCount(count + 1);
			}
		});

		socket.on('disconnect', () => {
			console.log('disconnected');
		});

		return () => {
			socket.disconnect();
		};
	}, [setNotification]);

	// handle logout
	const handleLogout = () => {
		logoutUser({
			email: user.email,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Logout successful');
			closeDrawerRight();
		}
	}, [isSuccess]);

	return (
		<>
			<Navbar className='fixed z-10 max-w-full px-4 py-2 border-0 rounded-none bg-black_2 top h-max lg:px-8 lg:py-4'>
				<div className='flex items-center justify-between text-blue-gray-100'>
					<Link href='/'>
						<Image src='/rapid-logo1.png' alt='logo' width={100} height={40} />
					</Link>
					{token ? (
						<div className='flex items-center gap-x-4 '>
							<div className='px-2 py-1 bg-gray-900 rounded-md '>
								{path === '/withdraw' ||
								path === '/convert' ||
								path === '/send' ? (
									<>
										<span>Earn: </span>
										<span>
											{Number(
												user?.e_balance ? user?.e_balance : 0.0
											)?.toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</span>
									</>
								) : path === '/trade' ? (
									<>
										<span>Trade B: </span>
										<span>
											{Number(
												user?.m_balance >= 0 ? user?.m_balance : 0.0
											)?.toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</span>
									</>
								) : (
									<>
										<span>Wallet: </span>
										<span>
											{Number(
												user?.m_balance >= 0
													? user?.m_balance + user?.ai_balance + user?.e_balance
													: 0.0
											)?.toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</span>
									</>
								)}

								<Link href='/deposits'>
									<BiSolidWallet className='inline-block ml-2 text-xl transition-all cursor-pointer hover:text-yellow-700 hover:scale-125 ' />
								</Link>
							</div>

							{/* Start Notification */}
							<div>
								<Menu placement='bottom-end'>
									<MenuHandler>
										<div className='relative '>
											<FaBell className='text-xl cursor-pointer' />
											{count > 0 && (
												<span className='absolute top-0 inline-flex items-center justify-center w-5 h-5 p-2 text-xs font-bold leading-none transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full text-blue-gray-100 left-3'>
													<span>{count > 9 ? '9+' : count}</span>
												</span>
											)}
										</div>
									</MenuHandler>
									{count > 0 && (
										<MenuList>
											{notifications?.map((notification: any) => (
												<MenuItem
													key={notification?._id}
													color='blueGray'
													className='hover:bg-blueGray-100'
													onClick={() => {
														handleNotification(notification?._id);
													}}
												>
													<div className='flex items-center justify-between'>
														<div className='flex items-center gap-x-2'>
															<div className='flex flex-col'>
																<p className='text-sm font-semibold text-blue-gray-900'>
																	{notification?.subject}
																</p>
															</div>
														</div>
													</div>
												</MenuItem>
											))}
										</MenuList>
									)}
								</Menu>
							</div>
							{/* End Notification */}

							<Avatar
								src={user?.avatar?.url ? user?.avatar?.url : '/profile.png'}
								size='sm'
								alt='avatar'
								withBorder={true}
								className='p-0.5 cursor-pointer'
								onClick={openDrawerRight}
							/>
						</div>
					) : (
						<div className='flex gap-2 '>
							<Link href='/login'>
								<Button size='sm' color='green'>
									Login
								</Button>
							</Link>
							<Link href='/register'>
								<Button size='sm' color='amber'>
									<span className='text-blue-gray-900'>Sign Up</span>
								</Button>
							</Link>
						</div>
					)}
				</div>
			</Navbar>
			<div>
				<Drawer
					placement='right'
					open={openRight}
					onClose={closeDrawerRight}
					className='bg-black_2 inset-y-0 w-[17rem] md:w-[20rem] lg:w-[25rem]'
				>
					<UserInfo closeDrawerRight={closeDrawerRight} />
					<hr className='border-blue-gray-900' />
					<Sidebar />
					<hr className='border-blue-gray-900' />
					<div className=''>
						<button
							onClick={handleLogout}
							className='w-full px-4 py-2 text-left hover:text-red-500'
						>
							<MdPowerSettingsNew className='inline-block mr-2 text-2xl' />
							<span>Logout</span>
						</button>
					</div>
				</Drawer>
			</div>
			{/* Dialog Box */}
			<Dialog
				open={open2}
				handler={handleOpen2}
				size='xs'
				className='bg-black_2'
			>
				<div className='flex items-center justify-between '>
					<DialogHeader className='font-bold text-center text-blue-gray-200'>
						{notiFication?.subject}
					</DialogHeader>
					<div className='flex items-end justify-end mx-2 my-2 '>
						<span onClick={handleOpen2}>
							<CloseIcon2 />
						</span>
					</div>
				</div>
				<hr className='border-0.5 border-black_3' />
				<DialogBody>
					<div className='my-4'>
						<div className='space-y-4 text-white '>
							<div className='relative flex flex-col gap-1 '>
								<p className='text-sm font-semibold text-blue-gray-200'>
									{notiFication?.description}
								</p>
							</div>
						</div>
					</div>
				</DialogBody>
			</Dialog>
		</>
	);
}
