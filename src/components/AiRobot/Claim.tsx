import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import { useClaimAiRobotProfitMutation } from '@/features/aiRobot/aiRobotApi';
import { Button } from '@material-tailwind/react';
import { ScaleLoader } from 'react-spinners';

const Claim = () => {
	const [claimAiRobotProfit, { isLoading, isSuccess, isError, error }] =
		useClaimAiRobotProfitMutation();

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
						className='w-full '
						onClick={() => claimAiRobotProfit(undefined)}
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
