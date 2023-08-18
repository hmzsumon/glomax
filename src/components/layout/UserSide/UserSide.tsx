import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdDashboard } from 'react-icons/md';
import { AiFillSecurityScan } from 'react-icons/ai';
import { HiIdentification } from 'react-icons/hi';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { FaUserPlus, FaQuora } from 'react-icons/fa';

export const sidItems = [
	{ id: 1, name: 'Dashboard', link: '/dashboard', icon: <MdDashboard /> },
	{ id: 2, name: 'Security', link: '/security', icon: <AiFillSecurityScan /> },
	{
		id: 3,
		name: 'Identification',
		link: '/identification',
		icon: <HiIdentification />,
	},
	{
		id: 4,
		name: 'Payment',
		link: '/payment',
		icon: <RiMoneyDollarCircleFill />,
	},
	{
		id: 5,
		name: 'Referral',
		link: '/referral',
		icon: <FaUserPlus />,
	},
	{
		id: 6,
		name: 'FAQ',
		link: '/faq',
		icon: <FaQuora />,
	},
	{
		id: 7,
		name: 'Test Redux Toolkit',
		link: '/test',
		icon: <FaQuora />,
	},
];
const UserSide = () => {
	const router = useRouter();
	return (
		<div className=' hidden md:block w-[240px] border-r border-gray-600 inset-y-0'>
			<ul>
				{sidItems.map((item, index) => (
					<Link href={item.link} key={index}>
						<li
							className={`px-4 py-3 flex items-center gap-4 ${
								router.pathname === item.link
									? 'bg-[#2B3139] border-l-4 border-l-yellow-500'
									: ''
							} text-white cursor-pointer hover:bg-[#2B3139]`}
						>
							{item.icon && item.icon}
							{item.name}
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default UserSide;
