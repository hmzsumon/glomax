import { useGetRankMembersQuery } from '@/features/auth/authApi';
import Link from 'next/link';
import React from 'react';
import { FaUsers, FaExternalLinkAlt } from 'react-icons/fa';

const headers = [
	{
		id: 1,
		title: 'Premier',
		class: 'text-left',
	},
	{
		id: 2,
		title: 'Elite',
		class: 'text-center',
	},
	{
		id: 3,
		title: 'Majestic',
		class: 'text-center',
	},

	{
		id: 5,
		title: 'Royal',
		class: 'text-center',
	},
	{
		id: 6,
		title: 'Glorious',
		class: 'text-right',
	},
];

const RankMembers = () => {
	const { data } = useGetRankMembersQuery();
	const { premierUsers, eliteUsers, majesticUsers, royalUsers, gloriousUsers } =
		data || {};
	console.log(gloriousUsers);

	return (
		<div>
			<h2 className='my-2 text-center '>Rank Members</h2>
			<div>
				<ul className='grid grid-cols-5 p-1 text-xs font-bold text-center uppercase border border-b-0 border-blue-700 text-blue-gray-300'>
					{headers.map((header) => (
						<li key={header.id} className={header.class}>
							{header.title}
						</li>
					))}
				</ul>
				<ul className='grid grid-cols-5 p-1 text-xs font-bold text-center uppercase border border-blue-700 text-blue-gray-300 '>
					<li className='text-left '>
						<Link
							href={{
								pathname: '/rank-users',
								query: { rank: 'premier' },
							}}
							passHref
						>
							{premierUsers?.length}
							<span>
								<FaUsers className='inline-block ml-1' />
							</span>
						</Link>
					</li>

					<li>
						<Link href='/rank-users?rank=elite' passHref>
							{eliteUsers?.length}
							<span>
								<FaUsers className='inline-block ml-1' />
							</span>
						</Link>
					</li>
					<li>
						<Link href='/rank-users?rank=majestic' passHref>
							{majesticUsers?.length}
							<span>
								<FaUsers className='inline-block ml-1' />
							</span>
						</Link>
					</li>
					<li>
						<Link href='/rank-users?rank=royal' passHref>
							{royalUsers?.length}
							<span>
								<FaUsers className='inline-block ml-1' />
							</span>
						</Link>
					</li>
					<li className='text-right '>
						<Link href='/rank-users?rank=glorious' passHref>
							{gloriousUsers?.length}
							<span>
								<FaUsers className='inline-block ml-1' />
							</span>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default RankMembers;
