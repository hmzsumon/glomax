import React, { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
	AiOutlineMenu,
	AiOutlineClose,
	AiOutlineHome,
	AiOutlineWallet,
	AiOutlineMessage,
} from 'react-icons/ai';
import { GiTrade } from 'react-icons/gi';
import { CgGames } from 'react-icons/cg';
import { TbMoneybag } from 'react-icons/tb';
import Submenu from './Submenu';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import dashboard from '../../../pages/dashboard';

const menuitems = [
	{
		id: 1,
		title: 'Home',
		url: '/',
		icon: <AiOutlineHome />,
		subItems: [],
		is_subMenu: false,
	},
	{
		id: 2,
		title: 'Wallet',
		url: '/wallet',
		subItems: [],
		icon: <AiOutlineWallet />,
		is_subMenu: false,
	},

	{
		id: 5,
		title: 'Earn',
		url: '/earn',
		subItems: [],
		icon: <TbMoneybag />,
		is_subMenu: false,
	},
];

const submenuItems = [
	{
		id: 3,
		title: 'Trade',
		url: '/trade',
		subItems: [
			{
				id: 1,
				title: 'BTC Trade',
				url: '/trade/btc',
			},
			{
				id: 2,
				title: 'ETH Trade',
				url: '/trade/eth',
			},
		],
		icon: <GiTrade />,
		is_subMenu: true,
	},
	{
		id: 4,
		title: 'Games',
		url: '/games',
		subItems: [
			{
				id: 1,
				title: 'P2P Games',
				url: '/games/p2p',
			},
			{
				id: 2,
				title: 'Slots Games',
				url: '/games/slots',
			},
		],
		icon: <CgGames />,
		is_subMenu: true,
	},
	{
		id: 6,
		title: 'Chat',
		url: '/chat',
		subItems: [
			{
				id: 1,
				title: 'Chat List',
				url: '/chat/list',
			},
			{
				id: 2,
				title: 'Chat Room',
				url: '/chat/room',
			},
		],
		icon: <AiOutlineMessage />,
		is_subMenu: true,
	},
];

const Header = (props: { onClickOutside: any }) => {
	const referId = process.env.NEXT_PUBLIC_DEFAULT_REFER_ID;
	const { isAuthenticated } = useSelector((state: any) => state.auth);

	let isTabletMid = useMediaQuery({ query: '(max-width: 768px)' });
	const [open, setOpen] = useState(isTabletMid ? true : false);
	const ref = useRef<HTMLDivElement>(null);
	const { onClickOutside } = props;

	useEffect(() => {
		const handleClickOutside = (event: { target: any }) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [onClickOutside]);
	const handleOpen = () => {
		console.log('Open');
		setOpen(!open);
	};
	useEffect(() => {
		if (isTabletMid) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, [isTabletMid]);

	return (
		<div ref={ref} className='px-4 text-white py-3 bg-[#181A20]'>
			<div className='flex items-center justify-between'>
				<Image src='/logo_white_2.png' alt='Logo' width={80} height={100} />
				{/* <nav className='items-center justify-between hidden text-xs md:flex'>
					<ul className='flex text-sm'>
						{menuitems.map((item) => (
							<li key={item.id} className='mx-2'>
								<Link href={item.url}>{item.title}</Link>
							</li>
						))}
						{submenuItems.map((item) => (
							<li key={item.id} className='mx-2'>
								{item.title}
							</li>
						))}
					</ul>
				</nav> */}
				{isAuthenticated ? (
					<div className='space-x-4 '>
						<Link
							href={{
								pathname: '/dashboard',
							}}
							className='px-3 py-1 font-semibold text-gray-800 bg-yellow-700 rounded '
						>
							Dashboard
						</Link>
					</div>
				) : (
					<div className='space-x-4 '>
						<Link href='/login'>Login</Link>
						<Link
							href={{
								pathname: '/register',
								query: { referral_id: referId },
							}}
							className='px-3 py-1 font-semibold text-gray-800 bg-yellow-700 rounded '
						>
							Register
						</Link>
					</div>
				)}
				{/* <div className=' md:hidden'>
					{open ? (
						<AiOutlineClose
							className='text-2xl text-red-500 '
							onClick={handleOpen}
						/>
					) : (
						<AiOutlineMenu className='text-2xl ' onClick={handleOpen} />
					)}
				</div> */}
			</div>
			{/* Start Mobile Menu */}

			{/* <div
				className={`md:hidden fixed  inset-0 max-h-screen top-0 left-0 z-[998]  bg-[#1E2329] w-[70%] transition-all duration-300 ease-in-out ${
					open ? 'translate-x-0' : '-translate-x-[100%]'
				}`}
			>
				<div>
					<nav className='h-full mt-10 '>
						<ul className=''>
							{menuitems.map((item) => (
								<li
									key={item.id}
									className=' cursor-pointer items-center justify-between px-4 hover:bg-[#181A20] py-2 border-b border-[#2D333B] '
								>
									<div>
										<div className='flex items-center justify-between w-full '>
											<Link
												href={item.url}
												className='flex items-center gap-4 mx-2'
												onClick={() => setOpen(false)}
											>
												{item.icon}
												{item.title}
											</Link>
										</div>
									</div>
								</li>
							))}
							{submenuItems.map((item) => (
								<div
									key={item.id}
									className=' cursor-pointer items-center justify-between px-4 hover:bg-[#181A20] py-2 border-b border-[#2D333B] '
								>
									<Submenu item={item} />
								</div>
							))}
						</ul>
					</nav>
				</div>
			</div> */}

			{/* End Mobile Menu */}
		</div>
	);
};

export default Header;
