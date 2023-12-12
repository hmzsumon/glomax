import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {
	Select,
	Option,
	Input,
	Dialog,
	DialogHeader,
	DialogBody,
} from '@material-tailwind/react';
import PulseLoader from 'react-spinners/PulseLoader';
import { useSelector } from 'react-redux';
import { m } from 'framer-motion';
import { useCreateWithdrawRequestMutation } from '@/features/withdraw/withdrawApi';
import { CloseIcon2, ExplanationIcon } from '@/utils/icons/CommonIcons';
import { maskEmail } from '@/utils/functions';
import { read } from 'fs';
import {
	useLoadUserQuery,
	useResendVerificationEmailMutation,
	useSecurityVerifyMutation,
} from '@/features/auth/authApi';

const LeftContent = () => {
	const [createWithdrawRequest, { isLoading, isSuccess, isError, error }] =
		useCreateWithdrawRequestMutation();

	// call resend email verification api
	const [
		resendVerificationEmail,
		{
			isLoading: isResendLoading,
			isSuccess: isResendSuccess,
			isError: isResendError,
			error: resendError,
		},
	] = useResendVerificationEmailMutation();

	const [
		securityVerify,
		{
			isLoading: v_isLoading,
			isSuccess: v_isSuccess,
			isError: v_isError,
			error: v_error,
		},
	] = useSecurityVerifyMutation();

	const { refetch } = useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const [way, setWay] = React.useState<string>('crypto');
	const [network, setNetwork] = React.useState<string>('TRC20');
	const [address, setAddress] = React.useState<string>(user?.trc20_address);
	const [payId, setPayId] = React.useState<string>('');
	const [amount, setAmount] = React.useState<number>(0);
	const [availableAmount, setAvailable] = React.useState<number>(0);
	const [receiveAmount, setReceiveAmount] = React.useState<number>(0);
	const [errorText, setErrorText] = React.useState<string>('');
	const [code, setCode] = useState<string>('');
	const [isResend, setIsResend] = useState<boolean>(false);
	const [codeError, setCodeError] = useState<boolean>(false);
	const [open2, setOpen2] = useState(false);
	const [balanceError, setBalanceError] = useState<boolean>(false);
	const [needAmount, setNeedAmount] = useState<number>(0);
	const handleOpen2 = () => setOpen2(!open2);

	// handle resend email verification
	const handleResend = () => {
		resendVerificationEmail({ email: user?.email as string });
		setIsResend(true);
	};

	// submit form
	const next = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		securityVerify({ email: user?.email, code: code });
	};

	// handle change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCodeError(false);
		setErrorText('');
		const { value } = e.target;
		setCode(value);
	};

	// set available amount
	useEffect(() => {
		const balance = user?.e_balance;
		setAvailable(balance);
		if (amount > user?.m_balance) {
			setNeedAmount(balance - user?.e_balance);
			setBalanceError(true);
		} else {
			setBalanceError(false);
		}
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
			setReceiveAmount(Number(value) - Number(value) * 0.07);
		} else {
			setReceiveAmount(Number(value) - Number(value) * 0.03);
		}
	};

	// handle submit
	const handleSubmit = () => {
		const data = {
			amount: amount,
			net_amount: receiveAmount,
			charge_p: way === 'crypto' ? 0.07 : 0.03,
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
		if (v_isError) {
			setCodeError(true);
			setErrorText('Invalid code');
		}
		if (v_isSuccess) {
			setOpen2(false);
			setAmount(0);
			setCode('');
			setIsResend(false);
			handleSubmit();
		}
	}, [v_isError, v_error, v_isSuccess]);

	useEffect(() => {
		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
		if (isSuccess) {
			refetch();
			toast.success('Withdraw request created successfully');
			setOpen2(false);
			setAmount(0);
		}
	}, [isError, error, isSuccess]);

	return (
		<div className='space-y-4 '>
			{/* <div className=''>
				<Input
					type='text'
					label='Select Method'
					className='text-blue-gray-100'
					value={way}
					readOnly={true}
				/>
			</div> */}

			<div className=''>
				{/* read only input */}
				<Input
					type='text'
					label='Network'
					className='text-blue-gray-100'
					value={network}
					readOnly={true}
				/>
			</div>

			<div className=''>
				<Input
					type='text'
					label={way === 'crypto' ? 'Address' : 'Binance Pay ID'}
					className=' focus:text-blue-gray-100'
					value={address}
					readOnly={true}
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

				<small className='flex items-center justify-between px-1 mt-1 text-blue-gray-700'>
					<span className=''>
						Available
						{user?.m_balance >= 0 ? (
							<span className='mx-1 text-blue-gray-300'>
								{Number(user?.e_balance ? user?.e_balance : 0).toFixed(2)}
							</span>
						) : (
							<PulseLoader size={10} color={'#fff'} />
						)}
						USDT
					</span>
					<span>
						Minimum Amount
						<span className='mx-1 text-blue-gray-300'>12</span>
						USDT
					</span>
				</small>
				{errorText && <small className='text-red-500'>{errorText}</small>}
			</div>

			<hr className='my-2 border border-blue-gray-900 ' />
			{user?.is_withdraw_requested && (
				<small className='text-center text-red-500 '>
					Your withdrawal request is under processing.
				</small>
			)}
			<div className='grid grid-cols-2 gap-4 '>
				<div className='space-y-1 '>
					<p className='text-xs text-blue-gray-600'>Receive Amount</p>
					<p className='font-bold text-blue-gray-300'>
						<span>{receiveAmount.toFixed(2)}</span> USDT
					</p>
					<p className='text-xs text-blue-gray-600'>
						processing fee:{' '}
						<span className='italic font-bold text-blue-gray-300'>
							{way === 'crypto' ? '7%' : '3%'}
						</span>{' '}
					</p>
				</div>

				<div className='flex flex-col items-center justify-center '>
					<button
						className='flex items-center justify-center w-full py-2 font-bold bg-yellow-700 rounded-lg text-blue-gray-900 disabled:opacity-50 disabled:cursor-not-allowed '
						disabled={
							errorText
								? true
								: false || !amount
								? true
								: false || user?.is_withdraw_requested || balanceError
						}
						onClick={handleOpen2}
					>
						{isLoading ? (
							<ScaleLoader height={15} color={'#fff'} />
						) : (
							<span>Confirm</span>
						)}
					</button>
					{balanceError && (
						<small className='mt-1 text-xs text-red-500'>
							Please convert {needAmount} USDT to Main Balance
						</small>
					)}
				</div>
			</div>
			{/* Dialog Security */}
			<Dialog
				open={open2}
				handler={handleOpen2}
				size='xs'
				className='bg-black_2'
			>
				<div className='flex items-center justify-between '>
					<DialogHeader className='font-bold text-center text-blue-gray-200'>
						Security Verification
					</DialogHeader>
					<div className='flex items-end justify-end mx-2 my-2 '>
						<span onClick={handleOpen2}>
							<CloseIcon2 />
						</span>
					</div>
				</div>
				<hr className='border-0.5 border-black_3' />
				<DialogBody>
					<div className='my-4'>
						<div className='space-y-4 text-white '>
							<div className='relative flex flex-col gap-1 '>
								<label className='text-sm font-semibold text-gray-400 '>
									Email Verification Code
								</label>
								<input
									className={`px-4 py-2 ${
										codeError && 'border-red-500'
									} text-gray-700 bg-transparent border rounded hover:border-yellow-500 focus:border-yellow-600  focus:outline-none`}
									type='text'
									value={code}
									onChange={(e) => handleChange(e)}
								/>
								<button
									className='absolute text-xs font-bold text-yellow-800 right-2 top-9'
									onClick={handleResend}
								>
									{isResend ? (
										<span className='flex text-gray-500 '>
											Verification code sent
											<ExplanationIcon h={4} w={4} color={''} />
										</span>
									) : (
										'Get code'
									)}
								</button>

								{codeError && (
									<p className='text-xs text-red-500'>{errorText}</p>
								)}

								{user?.email && (
									<small className='text-gray-500 '>
										Enter the 6-digit code sent to {maskEmail(user?.email)}
									</small>
								)}
							</div>

							<div className='my-6 space-y-4'>
								<button
									className='w-full py-3 font-semibold text-gray-800 bg-yellow-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700'
									onClick={next}
									disabled={isLoading || isResendLoading || code.length < 6}
								>
									{isLoading ? (
										<div className='flex justify-center'>
											<ScaleLoader color={'#ffffff'} loading={true} />
										</div>
									) : (
										'Next'
									)}
								</button>
							</div>
						</div>
					</div>
				</DialogBody>
			</Dialog>
		</div>
	);
};

export default LeftContent;
