import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import { useClaimAiRobotProfitMutation } from '@/features/aiRobot/aiRobotApi';
import { Button } from '@material-tailwind/react';
import { ScaleLoader } from 'react-spinners';

const Claim = () => {
	const [claimAiRobotProfit, { isLoading, isSuccess, isError, error }] =
		useClaimAiRobotProfitMutation();

	const [btnFalse, setBtnFalse] = useState<boolean>(false);

	// handle claim
	const handleClaim = () => {
		setBtnFalse(true);
		claimAiRobotProfit(undefined);
	};

	//after 5 sec set btnFalse to false
	useEffect(() => {
		setTimeout(() => {
			setBtnFalse(false);
		}, 5000);

		return () => {
			setBtnFalse(false);
		};
	}, [btnFalse]);

	useEffect(() => {
		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
		if (isSuccess) {
			toast.success('Claimed successfully');
		}
	}, [isError, isSuccess, error]);

	return (
		<div>
			<section className='flex flex-col justify-center mx-auto '>
				<div className='relative p-5 my-5 space-y-3 rounded-md '>
					<Button
						color='amber'
						className='w-full disabled:opacity-50 disabled:cursor-not-allowed '
						onClick={handleClaim}
						disabled={btnFalse || isLoading}
					>
						{isLoading ? (
							<ScaleLoader color='#fff' height={20} width={3} radius={2} />
						) : (
							'Claim AI Robot Profit'
						)}
					</Button>
				</div>
			</section>
		</div>
	);
};

export default Claim;
