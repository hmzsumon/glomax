import { Navbar } from '@material-tailwind/react';
import { HiHome } from 'react-icons/hi';
import { IoGameController } from 'react-icons/io5';
import { GiGamepadCross } from 'react-icons/gi';
import { ImShare } from 'react-icons/im';
import { PiPokerChipBold } from 'react-icons/pi';
import { MdInsertChart, MdOutlineStackedBarChart } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
	{
		id: 1,
		title: 'Home',
		link: '/',
		icon: <HiHome />,
	},
	{
		id: 2,
		title: 'Market',
		link: '/market',
		icon: <MdOutlineStackedBarChart />,
	},

	{
		id: 5,
		title: 'Trade',
		link: '/trade',
		icon: <MdInsertChart />,
	},
	{
		id: 4,
		title: 'Ai-Robot',
		link: '/ai-robot',
		icon: <FaRobot />,
	},
	{
		id: 3,
		title: 'Win',
		link: '/wingame',
		icon: <GiGamepadCross />,
	},
];

export default function FooterNav() {
	const router = useRouter();
	// console.log(router.pathname);
	return (
		<>
			<Navbar className='fixed bottom-0 z-10 max-w-full py-2 border-0 rounded-none md:px-8 bg-black_2 h-max lg:py-4'>
				<div>
					<div>
						<ul className='flex items-center justify-between w-full'>
							{menuItems.map((item) => (
								<Link
									key={item.id}
									href={item.link}
									className={`flex gap-1 flex-col items-center hover:text-yellow-800 ${
										item.id === 3 && router.pathname.includes('/wingame')
											? 'text-yellow-800'
											: router.pathname === item.link
											? 'text-yellow-800'
											: 'text-blue-gray-100'
									} `}
								>
									<span className='text-xl md:text-2xl'>{item.icon}</span>
									<span className='text-xs md:text-sm'>{item.title}</span>
								</Link>
							))}
						</ul>
					</div>
				</div>
			</Navbar>
		</>
	);
}
