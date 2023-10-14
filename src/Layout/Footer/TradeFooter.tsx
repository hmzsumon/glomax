import { Navbar } from '@material-tailwind/react';
import { HiHome } from 'react-icons/hi';
import { MdOutlineStackedBarChart } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UpDown from '@/components/Trade/UpDown';
import { GiWallet } from 'react-icons/gi';

const menuItems = [
	{
		id: 1,
		title: 'Home',
		link: '/',
		icon: <HiHome />,
	},
	{
		id: 3,
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
		id: 4,
		title: 'Ai-Robot',
		link: '/ai-robot',
		icon: <FaRobot />,
	},
];

export default function TradeFooter() {
	const router = useRouter();
	// console.log(router.pathname);
	return (
		<>
			<nav className='fixed bottom-0 z-10 w-full px-4 py-2 border-0 rounded-none md:px-8 bg-black_2 '>
				<div className=' md:grid md:grid-cols-12 md:gap-6'>
					<div className='items-center justify-center hidden h-full col-span-3 px-4 md:flex'>
						<ul className='flex items-center justify-between w-full'>
							{menuItems.map((item) => {
								if (item.id === 3 || item.id === 4) return null;
								return (
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
								);
							})}
						</ul>
					</div>
					<div className='w-full col-span-6 '>
						<UpDown />
					</div>
					<div className='items-center justify-center hidden h-full col-span-3 px-4 md:flex '>
						<ul className='flex items-center justify-between w-full'>
							{menuItems.map((item) => {
								if (item.id === 1 || item.id === 2) return null;

								return (
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
								);
							})}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
