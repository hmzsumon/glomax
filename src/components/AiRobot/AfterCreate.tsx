import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import {
	useCancelAiRobotMutation,
	useMyAiRobotQuery,
	useUpdateAiRobotAutoCreateMutation,
} from '@/features/aiRobot/aiRobotApi';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import { PiChartLineDuotone } from 'react-icons/pi';
import { formDateWithTimeToLocal } from '@/utils/functions';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ClockLoader from 'react-spinners/ClockLoader';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Switch,
} from '@material-tailwind/react';
import { text } from 'stream/consumers';

const AfterCreate = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useMyAiRobotQuery(undefined);
	// console.log(data);
	const { aiRobot } = data || {};
	const [
		cancelAiRobot,
		{
			isSuccess: c_isSuccess,
			isError: c_isError,
			isLoading: c_isLoading,
			error: c_error,
		},
	] = useCancelAiRobotMutation();
	const [
		updateAiRobotAutoCreate,
		{
			isError: a_isError,
			isSuccess: a_isSuccess,
			isLoading: a_isLoading,
			error: a_error,
		},
	] = useUpdateAiRobotAutoCreateMutation();
	const [more, setMore] = useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const [switchOn, setSwitchOn] = React.useState(false);
	const handleOpen = () => setOpen(!open);

	// handle switch
	const handleSwitch = () => {
		setSwitchOn(!switchOn);
		updateAiRobotAutoCreate({ auto_create: !switchOn, robot_id: aiRobot?._id });
	};

	useEffect(() => {
		if (aiRobot?.auto_create) {
			setSwitchOn(true);
		} else {
			setSwitchOn(false);
		}
	}, [aiRobot]);

	useEffect(() => {
		if (a_isSuccess) {
			toast.success('Ai Robot auto create updated successfully');
		}

		if (a_isError && a_error) {
			toast.error((a_error as fetchBaseQueryError).data.message);
		}
	}, [a_isSuccess, a_isError, a_isLoading, a_error]);

	useEffect(() => {
		if (c_isSuccess) {
			toast.success('Ai Robot cancelled successfully');
			setOpen(false);
		}

		if (c_isError && c_error) {
			toast.error((c_error as fetchBaseQueryError).data.message);
		}
	}, [c_isSuccess, c_isError, c_isLoading, c_error]);

	return (
		<div>
			<section className='flex flex-col justify-center mx-auto '>
				<div className='relative p-5 my-5 space-y-3 border border-yellow-700 rounded-md '>
					{/* <div className='absolute top-1 right-6'>
						<Switch
							color='green'
							label={`Auto Create ${switchOn ? 'On' : 'Off'}`}
							checked={switchOn}
							labelProps={{
								className: 'text-blue-gray-200 text-left',
							}}
							onChange={handleSwitch}
						/>
					</div> */}
					<div className='flex items-center justify-between '>
						<div className='flex flex-col items-center md:flex-row gap-x-2'>
							<div className='absolute md:hidden left-2 top-2'>
								<ClockLoader size={20} color='#FFA000' />
							</div>
							<div className='hidden md:block left-2 top-2'>
								<ClockLoader size={20} color='#FFA000' />
							</div>
							<h4 className='font-bold text-blue-gray-200 md:text-xl'>
								Ai Robot Running
							</h4>
						</div>
						<div>
							<div className='grid grid-cols-2 gap-2 my-4 '>
								<Link
									href={{
										pathname: '/create-robot',
										query: { mode: 'edit' },
									}}
								>
									<button
										className='w-full px-2 py-1 rounded bg-black_3 disabled:opacity-50 disabled:cursor-not-allowed'
										disabled
									>
										Edit
									</button>
								</Link>
								<button
									className='w-full px-2 py-1 rounded bg-black_3'
									onClick={handleOpen}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>

					<div className='text-sm '>
						<ul>
							<li className='flex items-start justify-between '>
								<p className=' text-blue-gray-400'>Total Investment</p>
								<p className=' text-blue-gray-100'>
									{Number(aiRobot?.current_investment).toLocaleString('en-US', {
										minimumFractionDigits: 2,
									})}
								</p>
							</li>
							<li className='flex items-start justify-between '>
								<p className=' text-blue-gray-400'>Pair</p>
								<p className='uppercase text-blue-gray-100'>{aiRobot?.pair}</p>
							</li>
							<li className='flex items-start justify-between '>
								<p className=' text-blue-gray-400'>Last Price</p>
								<p className=' text-blue-gray-100'>
									{Number(aiRobot?.last_price).toLocaleString('en-US', {
										minimumFractionDigits: 2,
									})}
								</p>
							</li>
							<li className='flex items-start justify-between '>
								<p className=' text-blue-gray-400'>Price Range</p>
								<p className='uppercase text-blue-gray-100'>
									{aiRobot?.price_range}
								</p>
							</li>
							<li className='flex items-start justify-between '>
								<p className=' text-blue-gray-400'>Created Time</p>
								<p className='uppercase text-blue-gray-100'>
									{formDateWithTimeToLocal(aiRobot?.open_time)}
								</p>
							</li>

							<li className='flex items-start justify-between '>
								<p className=' text-blue-gray-400'>Close Time</p>
								<p className='uppercase text-blue-gray-100'>
									{formDateWithTimeToLocal(aiRobot?.close_time)}
								</p>
							</li>
						</ul>

						{more && (
							<>
								<hr className='my-2 border border-black_3' />
								<ul>
									<li className='flex items-start justify-between '>
										<p className=' text-blue-gray-400'>Grid Number</p>
										<p className=' text-blue-gray-100'>{aiRobot?.grid_no}</p>
									</li>
									<li className='flex items-start justify-between '>
										<p className=' text-blue-gray-400'>Profit/Grid</p>
										<p className='uppercase text-blue-gray-100'>
											{aiRobot?.profit_percent}
										</p>
									</li>
									<li className='flex items-start justify-between '>
										<p className=' text-blue-gray-400'>Mode</p>
										<p className=' text-blue-gray-100'>{aiRobot?.mode}</p>
									</li>
									<li className='flex items-start justify-between '>
										<p className=' text-blue-gray-400'>Status</p>
										<p className=' text-blue-gray-100'>{aiRobot?.status}</p>
									</li>
									<li className='flex items-start justify-between '>
										<p className=' text-blue-gray-400'>Profit</p>
										<p className='uppercase text-blue-gray-100'>
											{Number(aiRobot?.profit).toLocaleString('en-US', {
												minimumFractionDigits: 2,
											})}
										</p>
									</li>
									<li className='flex items-start justify-between '>
										<p className=' text-blue-gray-400'>Ai Charge</p>
										<p className='uppercase text-blue-gray-100'>
											{Number(aiRobot?.trade_charge).toLocaleString('en-US', {
												minimumFractionDigits: 2,
											})}
										</p>
									</li>
									<li className='flex items-start justify-between '>
										<p className=' text-blue-gray-400'>Stop Loss</p>
										<p className='uppercase text-blue-gray-100'>
											{Number(aiRobot?.stop_loss).toLocaleString('en-US', {
												minimumFractionDigits: 2,
											})}
										</p>
									</li>
									<li className='flex items-start justify-between '>
										<p className=' text-blue-gray-400'>Take Profit</p>
										<p className='uppercase text-blue-gray-100'>
											{Number(aiRobot?.take_profit).toLocaleString('en-US', {
												minimumFractionDigits: 2,
											})}
										</p>
									</li>
								</ul>
							</>
						)}
						<div>
							<button
								className='text-yellow-700 '
								onClick={() => setMore(!more)}
							>
								{more ? 'Less' : 'More Info'}
								<MdKeyboardArrowDown
									className={`
                  ${
										more ? 'transform rotate-180' : ''
									} transition-all duration-200 text-2xl inline-block
                `}
								/>
							</button>
						</div>
					</div>
				</div>
				<div></div>
			</section>
			<>
				<Dialog
					open={open}
					size='xs'
					handler={handleOpen}
					className=' bg-black_2'
				>
					<DialogHeader>
						<span className='text-sm text-blue-gray-300'>
							Are you sure you want to cancel this Ai Robot?
						</span>
					</DialogHeader>
					<DialogBody>
						<span className='text-xs text-blue-gray-500'>
							If you cancel the Ai Spot Grid will never get the profit and 1%
							charge applicable for this grid investment.
						</span>
					</DialogBody>
					<DialogFooter>
						<Button
							variant='text'
							color='red'
							onClick={handleOpen}
							className='mr-1'
						>
							<span>Cancel</span>
						</Button>
						<Button
							variant='gradient'
							color='green'
							onClick={() => cancelAiRobot(undefined)}
						>
							<span>Confirm</span>
						</Button>
					</DialogFooter>
				</Dialog>
			</>
		</div>
	);
};

export default AfterCreate;
