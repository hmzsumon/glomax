import { Navbar } from '@material-tailwind/react';
import { HiHome } from 'react-icons/hi';
import { IoGameController } from 'react-icons/io5';
import { GiGamepadCross, GiWallet } from 'react-icons/gi';
import { ImShare } from 'react-icons/im';
import { PiPokerChipBold } from 'react-icons/pi';
import { MdInsertChart, MdOutlineStackedBarChart } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
	{
		id: 1,
		title: 'Wallet',
		link: '/wallet',
		icon: <GiWallet />,
	},
	{
		id: 2,
		title: 'Market',
		link: '/market',
		icon: <MdOutlineStackedBarChart />,
	},
	{
		id: 6,
		title: 'Trade',
		link: '/trade',
		icon: <MdInsertChart />,
	},
	{
		id: 7,
		title: 'Ai-Robot',
		link: '/ai-robot',
		icon: <FaRobot />,
	},
	{
		id: 3,
		title: 'Win-1m',
		link: '/wingame',
		icon: <GiGamepadCross />,
	},
	{
		id: 4,
		title: 'Win-3m',
		link: '/wingame-three',
		icon: <GiGamepadCross />,
	},
	{
		id: 5,
		title: 'Win-5m',
		link: '/wingame-five',
		icon: <GiGamepadCross />,
	},

	{
		id: 8,
		title: 'Referral',
		link: '/referral',
		icon: <ImShare />,
	},
];

export default function Menu() {
	const router = useRouter();
	// console.log(router.pathname);
	return (
		<div className='px-6 my-8 '>
			<div className='py-6 border-0 rounded-md md:px-8 bg-black_2 h-max lg:py-4'>
				<ul className='grid grid-cols-4 gap-8'>
					{menuItems.map((item) => (
						<Link
							key={item.id}
							href={item.link}
							className={`flex gap-2  flex-col items-center 
              hover:scale-125 transition-all duration-500
              hover:text-yellow-900 text-yellow-700
              
              `}
						>
							<span className='text-xl md:text-2xl'>{item.icon}</span>
							<span className='text-xs text-blue-gray-200 md:text-sm'>
								{item.title}
							</span>
						</Link>
					))}
				</ul>
			</div>
		</div>
	);
}
