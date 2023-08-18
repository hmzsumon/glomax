import React, { useState } from 'react';
import Image from 'next/image';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { formDateWithTime } from '@/utils/functions';

const UserInfo = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [show, setShow] = useState(false);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

	return (
		<div className='bg-black '>
			<div className='flex px-6 py-4 gap-x-4'>
				<div>
					<Image
						src='./images/icons/default-avater.svg'
						alt='user avater'
						width={70}
						height={50}
					/>
				</div>

				<div className='w-full space-y-3 '>
					<div className='flex items-center gap-2 justify-betweens md:justify-start'>
						<div className='w-full md:w-auto '>
							<h1>{user?.nick_name}</h1>
						</div>
						<div className='flex items-center justify-end w-full gap-x-2 md:w-auto '>
							<RiEdit2Fill className='p-1 text-2xl text-gray-400 bg-gray-600 rounded md:bg-transparent ' />
							<MdOutlineKeyboardArrowDown
								className={`p-1 text-2xl font-bold text-gray-400 ${
									show && 'transform rotate-180'
								} bg-gray-600 rounded md:hidden md:bg-transparent`}
								onClick={() => setShow(!show)}
							/>
						</div>
					</div>
					<div className='flex space-x-4'>
						<div className='flex items-center gap-2 md:items-start md:flex-col '>
							<p className='text-xs text-gray-500 '>User ID</p>
							<p className='text-xs '>{user?.customer_id}</p>
						</div>
						<div className='hidden space-y-1 md:block '>
							<p className='text-xs text-gray-500 '>User Type</p>
							<p className='text-xs '>Regular User</p>
						</div>
						<div className='hidden space-y-1 md:block '>
							<p className='text-xs text-gray-500 '>Last login time</p>
							<p className='text-xs '>
								{formDateWithTime(user?.last_login_info.date)} (
								{user?.last_login_info.ip_address})
							</p>
						</div>
					</div>
				</div>
			</div>
			{show && (
				<div className='px-10 py-6 space-y-4 md:hidden'>
					<div className='flex items-center justify-between'>
						<p className='text-xs text-gray-500 '>User Type</p>
						<p className='text-xs '>Regular User</p>
					</div>
					<div className='flex items-center justify-between'>
						<p className='text-xs text-gray-500 '>Last login time</p>
						<p className='text-xs '>
							{formDateWithTime(user?.last_login_info.date)} (
							{user?.last_login_info.ip_address})
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserInfo;
