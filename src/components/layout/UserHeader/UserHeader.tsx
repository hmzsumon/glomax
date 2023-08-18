import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaUser, FaBars } from 'react-icons/fa';
import { GiMining } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { sidItems } from '@/components/layout/UserSide/UserSide';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserSidebar from '../Sidebar/UserSidebar';
import { useMediaQuery } from 'react-responsive';
import {
	useMyMiningQuery,
	useStartMiningMutation,
} from '@/features/mining/miningApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';

const menuItems = [
	{ id: 1, name: 'Buy Crypto', link: '/buy-crypto' },
	{ id: 2, name: 'Markets', link: '/markets' },
	{ id: 3, name: 'Trade', link: '/trade' },
	{ id: 4, name: 'Earn', link: '/earn' },
];

// outside click hook
const useClickOutside = (handler: any) => {
	let domNode = useRef<HTMLDivElement>(null);
	useEffect(() => {
		let maybeHandler = (event: any) => {
			if (!domNode.current?.contains(event.target)) {
				handler();
			}
		};

		document.addEventListener('mousedown', maybeHandler);

		return () => {
			document.removeEventListener('mousedown', maybeHandler);
		};
	});

	return domNode;
};

const UserHeader = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [startMining, { isLoading, isError, isSuccess, error }] =
		useStartMiningMutation();
	const {
		data,
		isLoading: m_loading,
		isError: m_isError,
		error: m_error,
	} = useMyMiningQuery(user?._id);
	const { mining } = data || {};

	let isTabletMid = useMediaQuery({ query: '(max-width: 768px)' });
	const router = useRouter();
	const [open, setOpen] = useState(isTabletMid ? true : false);

	let domNode = useClickOutside(() => {
		setOpen(false);
	});

	const handleOpen = () => {
		setOpen(!open);
	};

	useEffect(() => {
		if (isTabletMid) {
			setOpen(false);
		} else {
			setOpen(false);
		}
	}, [isTabletMid]);

	useEffect(() => {
		if (isSuccess) {
			toast.success('Mining started');
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
	}, [isSuccess, isError, error]);

	return (
		<>
			<div className=' bg-[#181A20] py-4 px-4 border-b border-[#282b35] '>
				<div className='flex items-center justify-between '>
					<Link href='/' className='cursor-pointer '>
						<Image
							src='/logo_white_2.png'
							alt='logo'
							width={80}
							height={30}
							priority={true}
							className='h-auto cursor-pointer'
						/>
					</Link>
					<div className='hidden md:block '>
						<ul className='flex items-center justify-center gap-6 '>
							{menuItems.map((item) => (
								<li key={item.id}>{item.name}</li>
							))}
						</ul>
					</div>
					<div className='flex items-center justify-center gap-6 '>
						<button
							className='flex items-center px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-700 rounded disabled:cursor-not-allowed disabled:opacity-50 '
							onClick={() => startMining(user?._id)}
							disabled={isLoading || mining?.is_start}
						>
							<GiMining className='inline-block mr-1 ' />
							{isLoading
								? 'Loading...'
								: mining?.is_start
								? 'Mining'
								: 'Start Mine'}
						</button>

						<button
							className='flex items-center justify-center bg-white rounded-full w-7 h-7 '
							onClick={handleOpen}
						>
							<FaUser className='text-black ' />
						</button>
						<button className=''>
							<FaBars className='text-white ' />
						</button>
					</div>
				</div>

				{/* <div className='mt-3 overflow-x-scroll user-heder '>
					<ul className='w-[455px] flex items-center justify-center gap-4 md:hidden'>
						{sidItems.map((item) => (
							<Link href={item.link} key={item.id}>
								<li
									className={`${
										router.pathname === item.link &&
										' border-b-2 border-yellow-500 '
									} text-white cursor-pointer py-2 hover:text-yellow-700`}
								>
									{item.name}
								</li>
							</Link>
						))}
					</ul>
				</div> */}
			</div>
			<div
				ref={domNode}
				className={`fixed side-bar bg-[#2B3139] w-[75%] md:w-[40%] overflow-auto inset-y-0 right-0 ${
					open ? 'translate-x-0' : 'translate-x-full'
				} duration-500 z-50 py-4  `}
			>
				<div className='pr-4 '>
					<AiOutlineCloseCircle
						className='float-right text-2xl text-red-400 cursor-pointer '
						onClick={() => setOpen(false)}
					/>
				</div>
				<div className='mt-8 '>
					<UserSidebar />
				</div>
			</div>
		</>
	);
};

export default UserHeader;
