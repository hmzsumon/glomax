import React from 'react';
import { Select, Option, Input } from '@material-tailwind/react';
import PulseLoader from 'react-spinners/PulseLoader';
import { useSelector } from 'react-redux';

const LeftContent = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [way, setWay] = React.useState<string>('crypto');
	const [amount, setAmount] = React.useState<number>(0);
	const [receiveAmount, setReceiveAmount] = React.useState<number>(0);

	// handle amount change
	const handleAmountChange = (e: any) => {
		const value = e.target.value;
		setAmount(value);
		if (way === 'crypto') {
			setReceiveAmount(Number(value) - Number(value) * 0.055);
		} else {
			setReceiveAmount(Number(value) - Number(value) * 0.03);
		}
	};

	return (
		<div className='space-y-4 '>
			<div className=''>
				<Select
					color='blue'
					label='Select Way'
					value={way}
					onChange={(selectedValue) => setWay(selectedValue ?? '')}
					className=' text-blue-gray-100'
				>
					<Option value='binance'>Binance Pay</Option>
					<Option value='crypto'>Crypto</Option>
				</Select>
			</div>
			{way === 'crypto' && (
				<div className=''>
					<Select label='Select Network' className='text-blue-gray-100 '>
						<Option>TRC20</Option>
						<Option>ERC20</Option>
					</Select>
				</div>
			)}

			<div className=''>
				<Input
					type='text'
					label={way === 'crypto' ? 'Enter Address' : 'Enter Binance Pay ID'}
					className=' focus:text-blue-gray-100'
				/>
			</div>
			<div className=''>
				<Input
					type='text'
					color='blue'
					label='Enter Amount'
					className=' focus:text-blue-gray-100'
					value={amount}
					onChange={handleAmountChange}
				/>

				<small className=' flex items-center justify-between mt-1 px-1 text-blue-gray-700'>
					<span className=' '>
						Available
						{user?.m_balance ? (
							<span className=' text-blue-gray-300 mx-1'>
								{Number(user?.m_balance).toFixed(2)}
							</span>
						) : (
							<PulseLoader size={10} color={'#fff'} />
						)}
						USDT
					</span>
					<span>
						Minimum Amount
						<span className=' text-blue-gray-300 mx-1'>12</span>
						USDT
					</span>
				</small>
			</div>

			<hr className='my-2 border border-blue-gray-900 ' />
			<div className='grid grid-cols-2 gap-4 '>
				<div className='space-y-1 '>
					<p className='text-xs text-blue-gray-600'>Receive Amount</p>
					<p className='font-bold text-blue-gray-300'>
						<span>{receiveAmount.toFixed(2)}</span> USDT
					</p>
					<p className='text-xs text-blue-gray-600'>
						processing fee:{' '}
						<span className='italic font-bold text-blue-gray-300'>
							{way === 'crypto' ? '5.5%' : '3%'}
						</span>{' '}
					</p>
				</div>

				<div className='flex items-center justify-center '>
					<button className='w-full py-2 font-bold bg-yellow-700 rounded-lg text-blue-gray-900 '>
						Withdraw
					</button>
				</div>
			</div>
		</div>
	);
};

export default LeftContent;
