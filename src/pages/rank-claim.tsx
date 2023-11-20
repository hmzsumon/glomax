import React, { useEffect, useState } from 'react';
import Layout from '@/Layout';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import { GiRank3 } from 'react-icons/gi';
import {
	useClaimRankBonusMutation,
	useLoadUserQuery,
} from '@/features/auth/authApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const RankClaim = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [claimRankBonus, { isLoading, isError, isSuccess, error }] =
		useClaimRankBonusMutation();
	const router = useRouter();
	const handleClaim = () => {
		setBtnDisabled(true);
		claimRankBonus(undefined);
	};

	useEffect(() => {
		setTimeout(() => {
			setBtnDisabled(false);
		}, 3000);

		return () => {
			setBtnDisabled(false);
		};
	}, [btnDisabled]);

	// after 3 seconds, set the button to be enabled again
	useEffect(() => {
		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
		if (isSuccess) {
			toast.success('Rank bonus claimed successfully');
			router.push('/rewards');
		}
		setBtnDisabled(false);
	}, [isError, isSuccess]);

	return (
		<Layout>
			<div className='pt-20 md:pb-24 h-screen md:h-[100%]   px-1'>
				<div className='px-3 py-4 mx-auto md:w-6/12 opacity-95 bg-black_2'>
					<div>
						<GiRank3 className='mx-auto text-6xl text-center text-blue-gray-300' />
					</div>
					<h1 className='text-2xl font-bold text-center '>
						Claim your rank Bonus
					</h1>

					<div>
						<button
							className='w-full px-4 py-2 mt-5 font-bold bg-yellow-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-600 text-blue-gray-800'
							onClick={() => handleClaim()}
							disabled={user?.rank_claimed === true || btnDisabled}
						>
							Claim
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default RankClaim;
