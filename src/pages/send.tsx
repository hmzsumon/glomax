import Layout from '@/Layout';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@/services/helpers';
import DoughnutChart from '@/components/Wallet/DoughnutChart';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/global/ProtectedRoute';
import { useSelector } from 'react-redux';
import WalletHistory from '@/components/Wallet/WalletHistory';
import {
	useFindUserByCustomerIdMutation,
	useLoadUserQuery,
	useResendVerificationEmailMutation,
	useSecurityVerifyMutation,
} from '@/features/auth/authApi';
import { set } from 'nprogress';
import {
	Option,
	Input,
	Dialog,
	DialogHeader,
	DialogBody,
} from '@material-tailwind/react';
import { CloseIcon2, ExplanationIcon } from '@/utils/icons/CommonIcons';
import { maskEmail } from '@/utils/functions';
import { ScaleLoader } from 'react-spinners';
import { useSendMutation } from '@/features/send/sendApi';

const Send = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const [userId, setUserId] = React.useState('');
	const [amount, setAmount] = React.useState('');
	const [amountError, setAmountError] = React.useState('');
	const [recipient, setRecipient] = useState<any>(null);
	const [recipientError, setRecipientError] = React.useState('');
	const [code, setCode] = useState<string>('');
	const [codeError, setCodeError] = useState<boolean>(false);
	const [errorText, setErrorText] = React.useState<string>('');
	const [open2, setOpen2] = useState(false);
	const [isResend, setIsResend] = useState<boolean>(false);
	const handleOpen2 = () => setOpen2(!open2);
	// console.log('Recipient', userId);
	const [findUserByCustomerId, { data, isLoading, isError, error, isSuccess }] =
		useFindUserByCustomerIdMutation();

	// handle change user id
	const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientError('');
		setUserId(e.target.value);
	};

	// handle change amount & check amount > user e_balance
	const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmountError('');
		setAmount(e.target.value);

		// check min amount
		if (Number(e.target.value) < 10) {
			setAmountError('Minimum amount is 10 USDT');
		}

		if (Number(e.target.value) > user?.e_balance) {
			setAmountError('Amount is greater than your balance');
		}
	};

	// handle find user by customer id
	const handleFindUserByCustomerId = async () => {
		try {
			const res = await findUserByCustomerId(userId).unwrap();
			setRecipient(res?.user);
		} catch (error) {
			console.log(error);
			setRecipientError((error as fetchBaseQueryError).data.message);
		}
	};

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

	// handle change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCodeError(false);
		setErrorText('');
		const { value } = e.target;
		setCode(value);
	};

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

	// send usdt
	const [
		send,
		{
			isLoading: s_isLoading,
			isError: s_isError,
			isSuccess: s_isSuccess,
			error: s_error,
		},
	] = useSendMutation();

	// handle submit
	const handleSubmit = () => {
		const data = {
			recipient_id: recipient?.customer_id,
			amount: Number(amount),
		};
		send(data);
	};

	// for send
	useEffect(() => {
		if (s_isError) {
			toast.error((s_error as fetchBaseQueryError).data.message);
		}
		if (s_isSuccess) {
			toast.success('Send successfully');
		}
	}, [s_isError, s_error, s_isSuccess]);

	useEffect(() => {
		if (v_isError) {
			setCodeError(true);
			setErrorText('Invalid code');
		}
		if (v_isSuccess) {
			setOpen2(false);

			setCode('');
			setIsResend(false);
			handleSubmit();
			setRecipient(null);
			setAmount('');
			setUserId('');
		}
	}, [v_isError, v_error, v_isSuccess]);

	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-2 pt-20 pb-24 '>
					<div className='px-4 py-6 mx-auto rounded-lg text-blue-gray-200 bg-black_2 md:w-7/12'>
						<div className='space-y-2'>
							<h2 className='text-2xl font-bold text-center text-blue-gray-300 '>
								Send USDT
							</h2>
						</div>
						<hr className='my-2 border border-blue-gray-800 ' />
						<div className='my-4 space-y-3'>
							<div>
								<label
									htmlFor=''
									className='block mb-2 ml-1 text-sm font-medium text-blue-gray-300'
								>
									Send Mode
								</label>
								<input
									type='text'
									className='w-full px-2 py-2 border rounded-lg border-blue-gray-800 bg-black_2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
									placeholder='User ID'
									readOnly
								/>
							</div>

							<div>
								<label
									htmlFor=''
									className='block mb-2 ml-1 text-sm font-medium text-blue-gray-300'
								>
									User ID
								</label>
								<input
									type='text'
									className='w-full px-2 py-2 border rounded-lg border-blue-gray-800 bg-black_2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
									placeholder='Enter User ID'
									value={userId}
									onChange={(e) => handleChangeUserId(e)}
								/>
								<small>
									{recipientError && (
										<span className='text-xs text-red-500'>
											{recipientError}
										</span>
									)}
								</small>
							</div>
							{/* Amount */}
							<div>
								<label
									htmlFor=''
									className='block mb-2 ml-1 text-sm font-medium text-blue-gray-300'
								>
									Send Amount
								</label>
								<input
									type='number'
									className='w-full px-2 py-2 border rounded-lg border-blue-gray-800 bg-black_2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
									placeholder='Enter Amount'
									value={amount}
									onChange={(e) => handleChangeAmount(e)}
								/>
								<small>
									{amountError && (
										<span className='text-xs text-red-500'>{amountError}</span>
									)}
								</small>
							</div>

							{recipient && (
								<>
									<hr className='my-2 border border-blue-gray-800 ' />
									<div className='px-4 '>
										<div className='space-y-2 '>
											<li className='flex items-center justify-between list-none '>
												<span className='font-bold'>Send Mod:</span>{' '}
												<span>User Id</span>
											</li>
											<li className='flex items-center justify-between list-none '>
												<span className='font-bold'>To:</span>{' '}
												<span className='flex flex-col'>
													{recipient?.customer_id}
													<span className='text-xs text-blue-gray-500'>
														({recipient?.name})
													</span>
												</span>
											</li>

											<li className='flex items-center justify-between list-none '>
												<span className='font-bold'>Total amount:</span>{' '}
												<span>{amount} USDT</span>
											</li>

											<li className='flex items-center justify-between list-none '>
												<span className='font-bold'>Send From:</span>{' '}
												<span>Earn Wallet ( USDT)</span>
											</li>
										</div>
									</div>
									<hr className='my-2 border border-blue-gray-800 ' />
								</>
							)}

							<div>
								{recipient ? (
									<button
										onClick={handleOpen2}
										className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500'
									>
										Next
									</button>
								) : (
									<button
										onClick={handleFindUserByCustomerId}
										className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
										disabled={
											isLoading ||
											!userId ||
											!amount ||
											Number(amount) > user?.e_balance
										}
									>
										Find Recipient
									</button>
								)}
							</div>
						</div>
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
											'Confirm Send'
										)}
									</button>
								</div>
							</div>
						</div>
					</DialogBody>
				</Dialog>
			</ProtectedRoute>
		</Layout>
	);
};

export default Send;
