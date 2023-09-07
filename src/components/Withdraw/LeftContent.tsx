import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Select, Option, Input } from '@material-tailwind/react';
import PulseLoader from 'react-spinners/PulseLoader';
import { useSelector } from 'react-redux';
import { m } from 'framer-motion';
import { useCreateWithdrawRequestMutation } from '@/features/withdraw/withdrawApi';

const LeftContent = () => {
	const [createWithdrawRequest, { isLoading, isSuccess, isError, error }] =
		useCreateWithdrawRequestMutation();
	const { user } = useSelector((state: any) => state.auth);
	const [way, setWay] = React.useState<string>('crypto');
	const [network, setNetwork] = React.useState<string>('TRC20');
	const [address, setAddress] = React.useState<string>('');
	const [payId, setPayId] = React.useState<string>('');
	const [amount, setAmount] = React.useState<number>(0);
	const [availableAmount, setAvailable] = React.useState<number>(0);
	const [receiveAmount, setReceiveAmount] = React.useState<number>(0);
	const [errorText, setErrorText] = React.useState<string>('');

	// set available amount
	useEffect(() => {
		const balance = user?.m_balance - user?.trading_volume;
		setAvailable(balance);
	}, [user]);

	// handle amount change
	const handleAmountChange = (e: any) => {
		const value = e.target.value;
		setAmount(value);
		if (value < 12) {
			setErrorText('Minimum amount is 12 USDT');
			return;
		} else if (value > availableAmount) {
			setErrorText('Insufficient balance');
			return;
		} else {
			setErrorText('');
		}

		if (way === 'crypto') {
			setReceiveAmount(Number(value) - Number(value) * 0.05);
		} else {
			setReceiveAmount(Number(value) - Number(value) * 0.03);
		}
	};

	// handle submit
	const handleSubmit = () => {
		const data = {
			amount: amount,
			net_amount: receiveAmount,
			charge_p: way === 'crypto' ? 0.05 : 0.03,
			method: {
				name: way,
				network: network,
				address: address,
				pay_id: payId,
			},
		};
		createWithdrawRequest(data);
	};

	useEffect(() => {
		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
		if (isSuccess) {
			toast.success('Withdraw request created successfully');
		}
	}, [isError, error, isSuccess]);

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
					<Select
						label='Select Network'
						className='text-blue-gray-100 '
						value={network}
						onChange={(selectedValue) => setNetwork(selectedValue ?? '')}
					>
						<Option value='trc20'>TRC20</Option>
						<Option value='erc20'>ERC20</Option>
					</Select>
				</div>
			)}

			<div className=''>
				<Input
					type='text'
					label={way === 'crypto' ? 'Enter Address' : 'Enter Binance Pay ID'}
					className=' focus:text-blue-gray-100'
					value={way === 'crypto' ? address : payId}
					onChange={(e) => {
						if (way === 'crypto') {
							setAddress(e.target.value);
						} else {
							setPayId(e.target.value);
						}
					}}
				/>
			</div>
			<div className=''>
				<Input
					type='number'
					color='blue'
					label='Enter Amount'
					className={`focus:text-blue-gray-100 text-blue-gray-100
					${errorText ? 'text-red-500' : 'text-blue-gray-100'}`}
					value={amount}
					onChange={handleAmountChange}
				/>

				<small className=' flex items-center justify-between mt-1 px-1 text-blue-gray-700'>
					<span className=' '>
						Available
						{user?.m_balance ? (
							<span className=' text-blue-gray-300 mx-1'>
								{Number(availableAmount).toFixed(2)}
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
				{errorText && <small className='text-red-500'>{errorText}</small>}
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
							{way === 'crypto' ? '5%' : '3%'}
						</span>{' '}
					</p>
				</div>

				<div className='flex items-center justify-center '>
					<button
						className='w-full flex items-center justify-center py-2 font-bold bg-yellow-700 rounded-lg text-blue-gray-900 disabled:opacity-50 disabled:cursor-not-allowed '
						disabled={errorText ? true : false || !amount ? true : false}
						onClick={handleSubmit}
					>
						{isLoading ? (
							<ScaleLoader height={15} color={'#fff'} />
						) : (
							<span>Confirm</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default LeftContent;
