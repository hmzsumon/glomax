import React from 'react';

//icons
import { SlSocialTwitter, SlSocialYoutube } from 'react-icons/sl';
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import { BiLogoWhatsapp } from 'react-icons/bi';

const items = [
	{
		id: 1,
		title: 'About Us',
		links: [
			{
				id: 1,
				name: 'About Rapid Win',
				url: '/about',
			},
			{
				id: 2,
				name: 'Rapid win Blog',
				url: '/blog',
			},
			{
				id: 4,
				name: 'Legal & Privacy',
				url: '/legal',
			},
		],
	},

	{
		id: 4,
		title: 'Support',
		links: [
			{
				id: 1,
				name: 'Help Center',
				url: '/help-center',
			},
			{
				id: 2,
				name: '245/7 Support',
				url: '/support',
			},
			{
				id: 4,
				name: 'Fees',
				url: '/fees',
			},
		],
	},
];

const communities = [
	{
		id: 2,
		name: 'Twitter',
		icon: <SlSocialTwitter />,
		url: 'https://t.me/johan028',
	},

	{
		id: 4,
		name: 'whatsapp',
		icon: <BiLogoWhatsapp />,
		url: 'https://t.me/johan028',
	},
	{
		id: 6,
		name: 'Telegram',
		icon: <FaTelegram />,
		url: 'https://t.me/johan028',
	},
];
const Footer = () => {
	return (
		<div className='px-4 text-white md:py-8'>
			<div className=' md:grid md:grid-cols-3'>
				<div className='col-span-2 '>
					<div className='flex items-center justify-around mb-6 space-y-4 md:space-y-0'>
						{items.map((item) => {
							return (
								<div key={item.id} className=''>
									<h2>{item.title}</h2>
									<ul className='mt-1 text-gray-500 md:block'>
										{item.links.map((link) => {
											return <li key={link.id}>{link.name}</li>;
										})}
									</ul>
								</div>
							);
						})}
					</div>
				</div>
				<div className='w-full md:col-span-1'>
					<h2 className='text-center '>Community</h2>
					<div className='flex items-center justify-around w-full mt-8 '>
						{communities.map((community) => {
							return (
								<div
									key={community.id}
									className='flex items-center justify-between'
								>
									<div className='flex items-center justify-center text-2xl'>
										{community.icon}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className='border-t mt-8 border-[#272A2E]  flex items-center justify-center'>
				<p className='mt-4 text-gray-500 '>Glomax &#169; 2022</p>
			</div>
		</div>
	);
};

export default Footer;
