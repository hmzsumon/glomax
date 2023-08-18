import React from 'react';
import { BiDownArrow } from 'react-icons/bi';

const Submenu = ({ item }) => {
	const [showSubmenu, setShowSubmenu] = React.useState(false);
	return (
		<>
			<div className='flex items-center text-white justify-between'>
				<li className='flex items-center gap-4 mx-2'>
					{item.icon}
					{item.title}
				</li>
				<BiDownArrow
					className={`${
						showSubmenu ? 'transform rotate-180' : ''
					} cursor-pointer`}
					onClick={() => setShowSubmenu(!showSubmenu)}
				/>
			</div>
			{showSubmenu && (
				<ul className='ml-8 '>
					{item.subItems.map((subitem, index) => {
						return (
							<li key={index} className='flex items-center gap-4 mx-2'>
								{subitem.title}
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default Submenu;
