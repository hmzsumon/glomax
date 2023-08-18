import { type } from 'os';
import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import Link from 'next/link';

type SubMenuItemProps = {
	item: {
		id: number;
		name: string;
		link: string;
		icon: JSX.Element;
		calBack?: () => void;
		subItems?: {
			id: number;
			name: string;
			link: string;
		}[];
		isSubMenu: boolean;
	};
};

const SubMenuItem = ({ item }: SubMenuItemProps) => {
	const [showSubMenu, setShowSubMenu] = useState(false);
	// default selected item is 1

	// handleShowSubMenu is a function that toggles the value of showSubMenu
	const handleShowSubMenu = () => {
		setShowSubMenu(!showSubMenu);
	};
	return (
		<div
			key={item.id}
			className='px-4 py-3 cursor-pointer hover:bg-gray-700'
			onClick={handleShowSubMenu}
		>
			<div className='flex items-center justify-between w-full text-white cursor-pointer hover:text-yellow-700 '>
				<div className='flex items-center gap-2'>
					{item.icon}
					<p>{item.name}</p>
				</div>

				<div className=''>
					<IoMdArrowDropdown
						className={`${
							showSubMenu ? 'transform rotate-180' : ''
						} text-white text-2xl `}
					/>
				</div>
			</div>
			<div className='ml-6'>
				{showSubMenu &&
					item?.subItems?.map((subItem) => {
						return (
							<div key={subItem.id}>
								<Link href={subItem.link}>
									<li className='flex items-center gap-2 text-white cursor-pointer hover:text-yellow-700 '>
										{subItem.name}
									</li>
								</Link>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default SubMenuItem;
