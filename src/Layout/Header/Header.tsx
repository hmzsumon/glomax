import React, { useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import {
	Navbar,
	Typography,
	IconButton,
	Avatar,
	Drawer,
	Button,
} from '@material-tailwind/react';
import { BiSolidWallet } from 'react-icons/bi';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Sidebar } from './Sidebar';
import { maskEmail } from '@/utils/functions';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdPowerSettingsNew } from 'react-icons/md';
import { useLogoutUserMutation } from '@/features/auth/authApi';
import { WalletIcon } from '@/global/icons/CommonIcons';
import CopyToClipboard from '@/global/CopyToClipboard';
import UserInfo from './UserInfo';

export default function Header() {
	const [logoutUser, { isSuccess }] = useLogoutUserMutation();
	const { isAuthenticated, user } = useSelector((state: any) => state.auth);
	const [openRight, setOpenRight] = React.useState(false);
	const openDrawerRight = () => setOpenRight(true);
	const closeDrawerRight = () => setOpenRight(false);

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
					{isAuthenticated ? (
						<div className='flex items-center gap-4'>
							<div className='px-2 py-1 mr-4 bg-gray-900 rounded-md '>
								<span>
									{user?.m_balance
										? Number(user?.m_balance)?.toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
										  })
										: '0.00'}{' '}
								</span>
								<Link href='/deposit'>
									<BiSolidWallet className='inline-block ml-2 cursor-pointer hover:text-yellow-700 text-xl hover:scale-125 transition-all  ' />
								</Link>
							</div>

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
		</>
	);
}
