import React from 'react';

//icons
import { SlSocialTwitter, SlSocialYoutube } from 'react-icons/sl';
import { FaFacebookF, FaTelegram, FaInstagram } from 'react-icons/fa';
import { TiSocialLinkedin } from 'react-icons/ti';

const items = [
	{
		id: 1,
		title: 'About Us',
		links: [
			{
				id: 1,
				name: 'About Binance',
				url: '/about',
			},
			{
				id: 2,
				name: 'Binance Blog',
				url: '/blog',
			},
			{
				id: 3,
				name: 'Careers',
				url: '/careers',
			},
			{
				id: 4,
				name: 'Legal & Privacy',
				url: '/legal',
			},
		],
	},
	{
		id: 2,
		title: 'Products',
		links: [
			{
				id: 1,
				name: 'Exchange',
				url: '/exchange',
			},
			{
				id: 2,
				name: ' Cloud',
				url: '/cloud',
			},
			{
				id: 3,
				name: 'card',
				url: '/card',
			},
			{
				id: 4,
				name: 'Charity',
				url: '/charity',
			},
		],
	},
	{
		id: 3,
		title: 'Services',
		links: [
			{
				id: 1,
				name: 'Downloads',
				url: '/downloads',
			},
			{
				id: 2,
				name: 'buy crypto',
				url: '/buy-crypto',
			},
			{
				id: 3,
				name: 'Referral Program',
				url: '/referral-program',
			},
			{
				id: 4,
				name: 'Desktop App',
				url: '/desktop-app',
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
				id: 3,
				name: 'API Documentation',
				url: '/api-documentation',
			},
			{
				id: 4,
				name: 'Fees',
				url: '/fees',
			},
		],
	},
	{
		id: 5,
		title: 'Learn',
		links: [
			{
				id: 1,
				name: 'Learn & Earn',
				url: '/learn-earn',
			},
			{
				id: 2,
				name: 'Browse Crypto Markets',
				url: '/crypto-markets',
			},
			{
				id: 3,
				name: 'Crypto Loans',
				url: '/crypto-loans',
			},
			{
				id: 4,
				name: 'Crypto Savings',
				url: '/crypto-savings',
			},
		],
	},
];

const communities = [
	{
		id: 1,
		name: 'Facebook',
		icon: <FaFacebookF />,
		url: 'https://www.facebook.com/binance',
	},
	{
		id: 2,
		name: 'Twitter',
		icon: <SlSocialTwitter />,
		url: 'https://twitter.com/binance',
	},
	{
		id: 3,
		name: 'Instagram',
		icon: <FaInstagram />,
		url: 'https://www.instagram.com/binance/',
	},
	{
		id: 4,
		name: 'Youtube',
		icon: <SlSocialYoutube />,
		url: 'https://www.youtube.com/binance',
	},
	{
		id: 5,
		name: 'Linkedin',
		icon: <TiSocialLinkedin />,
		url: 'https://www.linkedin.com/company/binance/',
	},
	{
		id: 6,
		name: 'Telegram',
		icon: <FaTelegram />,
		url: 'https://t.me/binanceexchange',
	},
];
const Footer = () => {
	return (
		<div className='py-8 px-4 text-white'>
			<div className=' grid md:grid-cols-12'>
				<div className='col-span-10 mr-6'>
					<div className=' mb-6 space-y-4 md:space-y-0 flex flex-col md:flex-row md:items-center justify-between'>
						{items.map((item) => {
							return (
								<div key={item.id} className=''>
									<h2>{item.title}</h2>
									<ul className=' hidden md:block mt-1 text-gray-500 '>
										{item.links.map((link) => {
											return <li key={link.id}>{link.name}</li>;
										})}
									</ul>
								</div>
							);
						})}
					</div>
				</div>
				<div className=' col-span-2'>
					<h2>Community</h2>
					<div className='mt-4 flex md:grid md:grid-cols-3 gap-6'>
						{communities.map((community) => {
							return (
								<div
									key={community.id}
									className='flex items-center justify-between'
								>
									<div className='flex items-center justify-center'>
										{community.icon}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className='border-t mt-8 border-[#272A2E]  flex items-center justify-center'>
				<p className=' text-gray-500 mt-4'>
					World famous community &#169; 2023
				</p>
			</div>
		</div>
	);
};

export default Footer;
