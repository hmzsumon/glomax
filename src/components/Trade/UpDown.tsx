import React from 'react';
import { PiNavigationArrowFill } from 'react-icons/pi';
import { Select, Option, Input } from '@material-tailwind/react';
const UpDown = () => {
	const [time, setTime] = React.useState(1);
	const [amount, setAmount] = React.useState(0.1);

	// handle set time increment
	const handleSetTimeInc = (e: any) => {
		setTime(time + 2);
	};
	// handle set time decrement
	const handleSetTimeDec = (e: any) => {
		setTime(time - 2);
	};

	// handle set amount increment
	const handleSetAmountInc = (e: any) => {
		setAmount(amount + 0.1);
	};

	// handle set amount decrement
	const handleSetAmountDec = (e: any) => {
		setAmount(amount - 0.1);
	};

	// handle set amount decrement
	const handleSetAmount = (e: any) => {
		setAmount(e.target.value);
	};
	return (
		<div className=' space-y-1 '>
			<div className=' grid gap-4 grid-cols-2 '>
				<div>
					<li className=' rounded-md py-1 bg-black_3 flex items-center justify-around list-none'>
						<button
							className=' text-2xl md:text-3xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleSetTimeDec}
							disabled={time === 1 ? true : false}
						>
							-
						</button>
						<span>{time}min</span>
						<button
							className=' text-xl md:text-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleSetTimeInc}
							disabled={time === 5 ? true : false}
						>
							+
						</button>
					</li>
				</div>
				<div className=''>
					<li className='  list-none'>
						<input
							type='number'
							name=''
							placeholder='Amount (USDT))'
							value={amount}
							className='py-[0.7rem] pl-4 focus:outline-none border focus:border-transparent border-black_3 rounded-md w-full  bg-black_3 focus:border-0  active:border-0  text-xs font-bold'
							onChange={handleSetAmount}
						/>
					</li>
				</div>
			</div>
			<div className=' grid gap-4 grid-cols-12 '>
				<button className='rounded-md py-1 flex items-center justify-center gap-x-4 col-span-5 bg-red-500'>
					Down
					<PiNavigationArrowFill className='md:text-xl  rotate-180 ' />
				</button>
				<div className='col-span-2 flex items-center justify-center'>
					<div className=' bg-black_3 p-2 h-8 flex items-center justify-center rounded-full w-8'>
						<p className=' text-xs font-bold'>10</p>
					</div>
				</div>
				<button className='rounded-md flex items-center justify-center gap-x-5 py-1 col-span-5 bg-green-500'>
					UP
					<PiNavigationArrowFill className='md:text-xl  rotate-90 ' />
				</button>
			</div>
		</div>
	);
};

export default UpDown;
