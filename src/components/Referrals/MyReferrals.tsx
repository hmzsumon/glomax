import { useGetMyTeamQuery } from '@/features/auth/authApi';
import React from 'react';
import { FiUserPlus, FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { formDateWithTime } from '@/utils/functions';
import { User2Icon } from '@/utils/icons/SecurityIcons';
import FriendsList from './FriendsList';


type memberType = {
	_id: string;
	name: string;
	email: string;
	createdAt: string;
	customer_id: string;
	kyc_verified: boolean;
	join_date: Date;
	is_mining: boolean;
};

const MyReferrals = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading, isError, isSuccess, error } = useGetMyTeamQuery(
		user?._id
	);
	const members: memberType[] = data?.members;
	return (
		<>
			{isLoading ? (
				<div className='flex items-center justify-center '>
					<SyncLoader color='#EAB308' size={10} />
				</div>
			) : (
				<>
					<div className='my-6 '>
						<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
							<FriendsList />
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default MyReferrals;
